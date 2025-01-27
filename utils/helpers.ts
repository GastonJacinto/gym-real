import { Column } from '@/types/table';

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
type MappedData = Record<string, any>;

export const mapDataToColumns = (
  data: any[],
  columns: Column[]
): MappedData[] => {
  return data.map((item) => {
    const mappedItem: MappedData = {};

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
    });

    return mappedItem;
  });
};
