export const getFullStorageUrl = (filePath: string) => {
    return `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/image_bucket/${filePath}`;
  };