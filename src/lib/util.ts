import { differenceInYears, format } from "date-fns";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";

// TODO - write tests for all those

export function calculateAge(dateOfBirth: Date) {
  return differenceInYears(new Date(), dateOfBirth);
}

export function formatShortDateTime(date: Date) {
  // return in a nice format, :a means am-pm
  return format(date, "dd MM yy h:mm:a");
}

// a helper function to set react form hook errors
export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((e) => {
      // next line is just first item in array joined by nothing...
      const fieldName = e.path.join(".") as Path<TFieldValues>;
      setError(fieldName, { message: e.message });
    });
  } else {
    setError("root.serverError", { message: errorResponse.error });
  }
}

export function transformImageUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return null;
  }

  if (!imageUrl.includes("cloudinary")) {
    return imageUrl;
  }

  return imageUrl.replace(/(\/upload\/)/, "$1" + "c_fill,w_300,h_300,g_faces/");
}

export function truncateString(text?: string | null, num = 50) {
  if (!text) {
    return null;
  }

  if (text.length <= num) {
    return text;
  }

  return text.slice(0, num) + "...";
}

export function createChatId(a: string, b: string) {
  return a > b ? `${b}-${a}` : `${a}-${b}`;
}
