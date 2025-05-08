import { forwardRef } from "react";
import { Upload, type UploadProps } from "@arco-design/web-react";
import { AxiosRequestConfig } from "axios";
import {
  RequestOptions,
  UploadInstance,
} from "@arco-design/web-react/es/Upload";
import { fileUpload } from "./config";

type FileUploadProps = {
  [k in keyof UploadProps]: UploadProps[k];
} & {
  requestConfig?: AxiosRequestConfig;
};

const FileUpload = forwardRef(
  (
    { requestConfig, ...uploadProps }: FileUploadProps,
    ref: React.ForwardedRef<UploadInstance>
  ) => {
    const customRequest = (options: RequestOptions) => {
      const { onProgress, file, onSuccess, onError } = options;
      const formData = new FormData();
      formData.append("file", file);
      fileUpload(formData, {
        ...requestConfig,
        onUploadProgress: (event) => {
          const { loaded, total = 0 } = event;
          onProgress(Number(Math.round((loaded / total) * 100).toFixed(2)));
        },
      })
        .then((res) => {
          onSuccess(res);
        })
        .catch(onError);
    };
    return (
      <Upload ref={ref} customRequest={customRequest} {...uploadProps}></Upload>
    );
  }
);

export default FileUpload;
