/**
 * Google Sheets integration service for wedding guest form submissions
 *
 * This service handles the submission of guest form data to a Google Sheet
 * using Google Apps Script as a web app endpoint.
 */

export interface GuestFormSubmission {
  name: string;
  email?: string;
  phone?: string;
  attendance: "yes" | "no" | "maybe";
  guestCount: number;
  dietaryRequirements?: string | string[];
  specialRequests?: string;
  timestamp: string;
}

export interface GoogleSheetsResponse {
  result: "success" | "error";
  error?: string;
  row?: number;
}

/**
 * Submits guest form data to Google Sheets via Google Apps Script web app
 *
 * @param data - The guest form submission data
 * @returns Promise that resolves when submission is successful
 * @throws Error if submission fails
 */
export const submitGuestFormToSheets = async (
  data: Omit<GuestFormSubmission, "timestamp">
): Promise<GoogleSheetsResponse> => {
  const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  if (!GOOGLE_SHEETS_URL) {
    throw new Error(
      "Google Sheets URL nincs konfigurálva. Kérjük, állítsd be a VITE_GOOGLE_SHEETS_URL környezeti változót."
    );
  }

  const submissionData: GuestFormSubmission = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  try {
    // Create FormData for the submission
    const formData = new FormData();
    Object.entries(submissionData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "dietaryRequirements" && Array.isArray(value)) {
          formData.append(key, value.join(", "));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      body: formData,
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GoogleSheetsResponse = await response.json();

    if (result.result !== "success") {
      throw new Error(
        result.error ||
          "Ismeretlen hiba történt a Google Sheets submission során"
      );
    }

    return result;
  } catch (error) {
    console.error("Google Sheets submission error:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Hálózati hiba: Nem sikerült kapcsolódni a szerverhez. Kérjük, ellenőrizd az internetkapcsolatot."
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Váratlan hiba történt a visszajelzés elküldése során.");
  }
};

/**
 * Validates that the Google Sheets URL is properly configured
 *
 * @returns boolean indicating if the URL is configured
 */
export const isGoogleSheetsConfigured = (): boolean => {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_URL;
  return Boolean(url && url.trim().length > 0);
};

/**
 * Gets the configured Google Sheets URL (for debugging purposes)
 *
 * @returns The configured URL or null if not set
 */
export const getGoogleSheetsUrl = (): string | null => {
  return import.meta.env.VITE_GOOGLE_SHEETS_URL || null;
};
