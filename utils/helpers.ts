import { Column } from '@/types/table';
import { SupabaseClient } from '@supabase/supabase-js';

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');
  // Concatenate the URL and the path.
  const pathUrl = path ? `${url}/${path}` : url;
  return pathUrl;
};
export type MappedData = {
  [key: string]: any;
  data: any;
};

export const mapDataToColumns = (
  data: any[],
  columns: Column[]
): MappedData[] => {
  return data.map((item) => {
    const mappedItem: MappedData = {
      data: item,
    };
    columns.forEach((column) => {
      const { key, type } = column;

      if (type === 'avatar') {
        // For "avatar" type, include both name and avatar URL
        mappedItem['name'] =
          `${item.first_name || ''} ${item.last_name || ''}`.trim();

        mappedItem['avatar'] = item.avatar || null;
      } else {
        // Assign other keys directly
        mappedItem[key] = item[key as keyof typeof item] || null;
      }
      if (key == 'credits') {
        mappedItem['credits'] = item?.profiles?.credits || null;
      }
    });
    return mappedItem;
  });
};

export const getPersonFullName = (first_name: string, last_name: string) =>
  `${last_name}, ${first_name}`;

// export const getFilesFromFormData = (formData: FormData) => {
//   const files: Blob[] = [];
//   for (let [key, value] of formData.entries()) {
//     // Check if the value is a Blob
//     if (value instanceof Blob) {
//       // If it is, add it to the array
//       files.push(value);
//     }
//   }
//   return files;
// };

export const generateRandom6DigitsCode = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

export const parseFormData = (formData: FormData, key: string) => {
  return JSON.parse((formData.get(key) as string) || '{}');
};

export const getPublicUrlFromFile = ({
  supabase,
  path,
  bucket,
}: {
  supabase: SupabaseClient;
  path: string;
  bucket: string;
}) => {
  const { data: publicURL } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicURL?.publicUrl;
};

// import type { Tables } from '@/types_db';

// type Price = Tables<'prices'>;
export const formatDate = (date: Date, format: string): string => {
  const padToTwoDigits = (num: number): string =>
    num.toString().padStart(2, '0');

  const year = date.getFullYear().toString();
  const month = padToTwoDigits(date.getMonth() + 1);
  const day = padToTwoDigits(date.getDate());
  const hours = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());

  let formattedDate = format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);

  return `${formattedDate} at ${hours}:${minutes}`;
};

export const getUniqueSlug = (str: string) =>
  removeAccents(str.replaceAll(' ', '_').toLowerCase());
export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: { price: any };
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });

  return res.json();
};

export const toDateTime = (secs: number) => {
  var t = new Date(+0); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined;
  }

  const currentDate = new Date(); // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ); // Add trial days
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp in seconds
};

const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description'],
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'status',
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  );

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) =>
  getToastRedirect(
    path,
    'error',
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );

export const camelCaseToWords = (s: string) => {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const snakeCaseToWords = (s: string) => {
  return s
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
