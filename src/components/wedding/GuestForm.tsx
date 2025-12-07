import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { submitGuestFormToSheets } from '@/services/googleSheets';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Heart, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Form validation schema
const guestFormSchema = z.object({
  name: z
    .string()
    .min(3, 'A név legalább 3 karakter hosszú legyen')
    .max(100, 'A név maximum 100 karakter lehet'),
  email: z
    .string()
    .email('Kérjük, adj meg egy érvényes email címet')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(8, 'A telefonszám legalább 8 karakter hosszú legyen')
    .optional()
    .or(z.literal('')),
  attendance: z.enum(['yes', 'no', 'maybe'], {
    required_error: 'Kérjük, válaszd ki a részvételi szándékodat',
  }),
  guestCount: z
    .number()
    .min(1, 'Legalább 1 főnek kell lennie')
    .max(6, 'Maximum 6 fő lehet')
    .optional(),
  dietaryRequirements: z
    .array(z.enum(['vegetarian', 'vegan', 'gluten-free', 'lactose-free', 'nut-allergy', 'shellfish-allergy', 'other']))
    .optional()
    .default([]),
  specialRequests: z
    .string()
    .max(1000, 'A különleges kérések maximum 1000 karakter lehetnek')
    .optional(),
}).refine(
  (data) => {
    // guestCount is required only when attendance is "yes" or "maybe"
    if (data.attendance === 'yes' || data.attendance === 'maybe') {
      return data.guestCount !== undefined && data.guestCount >= 1 && data.guestCount <= 6;
    }
    // When attendance is "no", guestCount should be undefined
    return true;
  },
  {
    message: 'A vendégek száma kötelező, ha részt veszel az esküvőn',
    path: ['guestCount'],
  }
);

type GuestFormData = z.infer<typeof guestFormSchema>;

interface GuestFormProps {
  onSuccess?: () => void;
}

const GuestForm: React.FC<GuestFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const form = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      attendance: undefined,
      guestCount: undefined,
      dietaryRequirements: [],
      specialRequests: '',
    },
  });

  const attendanceValue = form.watch('attendance');

  // Reset guestCount when attendance changes to "no"
  useEffect(() => {
    if (attendanceValue === 'no') {
      form.setValue('guestCount', undefined, { shouldValidate: false });
    } else if ((attendanceValue === 'yes' || attendanceValue === 'maybe') && !form.getValues('guestCount')) {
      // Set default value when switching to yes/maybe if no value exists
      form.setValue('guestCount', 1, { shouldValidate: false });
    }
  }, [attendanceValue, form]);



  const onSubmit = async (data: GuestFormData): Promise<void> => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await submitGuestFormToSheets({
        name: data.name,
        email: data.email,
        phone: data.phone,
        attendance: data.attendance,
        guestCount: data.attendance === 'no' ? undefined : data.guestCount,
        dietaryRequirements: data.dietaryRequirements && data.dietaryRequirements.length > 0
          ? data.dietaryRequirements.join(', ')
          : undefined,
        specialRequests: data.specialRequests,
      });
      
      // Show success toast
      toast.success('Visszajelzés elküldve! 🎉', {
        description: 'Köszönjük a visszajelzést, ott találkozunk!',
        duration: 6000,
      });
      
      // Reset form and set success status
      form.reset();
      setSubmitStatus('success');
      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Hiba történt a visszajelzés elküldése során. Kérjük, próbáld újra később.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showGuestDetails = attendanceValue === 'yes' || attendanceValue === 'maybe';

  return (
    <Card className="wedding-card-enhanced bg-background/95 backdrop-blur-md border-primary/20">
      {submitStatus !== 'success' && (
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-primary animate-pulse-slow" size={24} />
            <CardTitle className="text-display-md text-primary">
              Visszajelzés
            </CardTitle>
            <Heart className="text-primary animate-pulse-slow" size={24} />
          </div>
          <p className="text-body-elegant text-muted-foreground">
            Kérjük, töltsd ki az alábbi űrlapot, hogy tudjuk, számíthatunk-e rád - reméljük, igen!
          </p>
        </CardHeader>
      )}
      
      <CardContent className="p-6 md:p-8">
        {submitStatus === 'error' && (
          <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex items-center justify-center mb-4">
              <Heart className="text-primary animate-pulse-slow" size={48} />
            </div>
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Köszönjük a visszajelzést! 🎉
            </h3>
            <p className="text-body-elegant text-muted-foreground">
              Visszajelzésedet sikeresen megkaptuk. Várunk az esküvőn!
            </p>
          </div>
        ) : (
          <Form {...form}> 
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Teljes név *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Kovács János"
                      className="wedding-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Email cím
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="kovacs.janos@email.com"
                      className="wedding-input"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Opcionális, de segít a kapcsolattartásban
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Telefonszám
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+36 30 123 4567"
                      className="wedding-input"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Opcionális, de segít a kapcsolattartásban
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attendance Field */}
            <FormField
              control={form.control}
              name="attendance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Részvételi szándék *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="wedding-input">
                        <SelectValue placeholder="Válassz egy opciót" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Igen, ott leszek! 🎉</SelectItem>
                      <SelectItem value="maybe">Még nem biztos 🤔</SelectItem>
                      <SelectItem value="no">Sajnos nem tudok menni 😢</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Guest Count - only show if attending */}
            {showGuestDetails && (
              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Vendégek száma (téged is beleértve) *
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="wedding-input">
                          <SelectValue placeholder="Válassz egy számot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((count) => (
                          <SelectItem key={count} value={count.toString()}>
                            {count} {count === 1 ? 'fő' : 'fő'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Hány fővel érkezel összesen?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Dietary Requirements - only show if attending */}
            {showGuestDetails && (
              <FormField
                control={form.control}
                name="dietaryRequirements"
                render={({ field }) => {
                  const dietaryOptions: Array<{
                    value: 'vegetarian' | 'vegan' | 'gluten-free' | 'lactose-free' | 'nut-allergy' | 'shellfish-allergy' | 'other';
                    label: string;
                  }> = [
                    { value: 'vegetarian', label: 'Vegetáriánus' },
                    { value: 'vegan', label: 'Vegán' },
                    { value: 'gluten-free', label: 'Gluténmentes' },
                    { value: 'lactose-free', label: 'Laktózmentes' },
                    { value: 'other', label: 'Egyéb' },
                  ];
                  const currentValue = field.value || [];
                  return (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">
                        Étkezési igények / Allergiák
                      </FormLabel>
                      <div className="space-y-3">
                        {dietaryOptions.map((option) => {
                          const isChecked = currentValue.includes(option.value);
                          return (
                            <FormItem
                              key={option.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...currentValue, option.value]);
                                    } else {
                                      field.onChange(currentValue.filter((v) => v !== option.value));
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
                        })}
                      </div>
                      <FormDescription>
                        Kérjük, válaszd ki az étkezési igényeidet vagy allergiáidat
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}

            {/* Special Requests - only show if attending */}
            {showGuestDetails && (
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Megjegyzés
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bármilyen egyéb információ, amit tudnunk kellene"
                        className="wedding-input min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full wedding-button text-lg py-6 h-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Küldés...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Visszajelzés elküldése
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestForm;
