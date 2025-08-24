import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { submitGuestFormToSheets } from '@/services/googleSheets';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle, Heart, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Form validation schema
const guestFormSchema = z.object({
  name: z
    .string()
    .min(2, 'A név legalább 2 karakter hosszú legyen')
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
    .max(10, 'Maximum 10 fő lehet'),
  foodAllergies: z
    .string()
    .max(500, 'Az étel allergiák leírása maximum 500 karakter lehet')
    .optional(),
  dietaryRestrictions: z
    .string()
    .max(500, 'Az étkezési megszorítások leírása maximum 500 karakter lehet')
    .optional(),
  specialRequests: z
    .string()
    .max(1000, 'A különleges kérések maximum 1000 karakter lehetnek')
    .optional(),
});

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
      guestCount: 1,
      foodAllergies: '',
      dietaryRestrictions: '',
      specialRequests: '',
    },
  });



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
        guestCount: data.guestCount,
        foodAllergies: data.foodAllergies,
        dietaryRestrictions: data.dietaryRestrictions,
        specialRequests: data.specialRequests,
      });
      setSubmitStatus('success');
      form.reset();
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

  const attendanceValue = form.watch('attendance');
  const showGuestDetails = attendanceValue === 'yes' || attendanceValue === 'maybe';

  return (
    <Card className="wedding-card-enhanced bg-background/95 backdrop-blur-md border-primary/20">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="text-primary animate-pulse-slow" size={24} />
          <CardTitle className="text-display-md text-primary">
            Visszajelzés
          </CardTitle>
          <Heart className="text-primary animate-pulse-slow" size={24} />
        </div>
        <p className="text-body-elegant text-muted-foreground">
          Kérjük, töltsd ki az alábbi űrlapot, hogy megerősítsd részvételed az esküvőnkön.
        </p>
      </CardHeader>
      
      <CardContent className="p-6 md:p-8">
        {submitStatus === 'success' ? (
          // Success state - only show success message
          <div className="text-center py-6">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600 animate-pulse-slow" />
            </div>
            <h3 className="text-display-md text-primary mb-4">
              Köszönjük a visszajelzést!
            </h3>
            <Alert className="border-green-200 bg-green-50 text-green-800 mb-6">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-lg">
                A visszajelzésed sikeresen elküldtük. Hamarosan felvesszük veled a kapcsolatot az esküvő részleteivel kapcsolatban.
              </AlertDescription>
            </Alert>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-body-elegant">
                Ha bármilyen kérdésed van, bátran keress minket a lenti elérhetőségeken.
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Heart className="text-primary animate-float" size={20} />
                <span className="font-script text-script-lg text-primary">
                  Alig várjuk, hogy veletek ünnepelhessünk!
                </span>
                <Heart className="text-primary animate-float" size={20} />
              </div>
            </div>
          </div>
        ) : (
          // Form state - show error message (if any) and form
          <>
            {submitStatus === 'error' && (
              <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

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
                      Vendégek száma (te is beleértve) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        className="wedding-input"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>
                      Hány fővel érkezel összesen?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Food Allergies - only show if attending */}
            {showGuestDetails && (
              <FormField
                control={form.control}
                name="foodAllergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Étel allergiák
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Pl.: mogyoró, tenger gyümölcsei, laktóz..."
                        className="wedding-input min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Kérjük, sorold fel az összes étel allergiádat
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Dietary Restrictions - only show if attending */}
            {showGuestDetails && (
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Étkezési megszorítások
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Pl.: vegetáriánus, vegán, gluténmentes..."
                        className="wedding-input min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Speciális étkezési igények (vegetáriánus, vegán, stb.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
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
                      Különleges kérések
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bármilyen különleges kérés vagy megjegyzés..."
                        className="wedding-input min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Bármilyen egyéb információ, amit tudnunk kellene
                    </FormDescription>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestForm;
