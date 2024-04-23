import { useState } from "react";
import { AttachmentInput } from "../../generated";
import { useAuth } from "../../Context/AuthManager";
import axios, { AxiosRequestConfig } from "axios";
import { UPLOAD_API_ROOT } from "../../config/Constants";

const useUploadAttachments = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attachmentList, setAttachmentList] = useState<AttachmentInput[]>([]);
  const auth = useAuth();
  const uploadAttachments = async (
    files: File[]
  ): Promise<AttachmentInput[] | null> => {
    setError(null);
    setLoading(true);
    let results: AttachmentInput[] | null;
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const token = await auth.user?.getIdToken();
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const {
        data: { data },
      } = await axios.post(UPLOAD_API_ROOT, formData, config);

      results = data as AttachmentInput[];

      results = results?.map(({ key, name, location, mimeType }) => ({
        key,
        name: name || key,
        location,
        mimeType,
      }));

      setAttachmentList(results);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any /*tslint:disable-line:no-explicit-any*/) {
      setError(e.message);
      console.log("We could not upload all the attachments ", e);
      results = null;
    }
    setLoading(false);
    return results;
  };

  return { uploadAttachments, attachmentList, error, loading };
};
export default useUploadAttachments;
