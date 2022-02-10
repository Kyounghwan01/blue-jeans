import { useState, useMemo, useRef, useCallback } from "react";
import styled from "styled-components";
import { compressImage } from "utils";
import dynamic from "next/dynamic";
import BasicLayout from "components/common/BasicLayout";
import { quilFormats } from "utils/constants";
import CancelIcon from "@mui/icons-material/Cancel";
import cloneDeep from "lodash/cloneDeep";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const Index = () => {
  const [value, setValue] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewURLs, setPreviewURLs] = useState<{ url: string; blob: File }[]>(
    []
  );

  const deleteImage = useCallback(
    (index: number) => {
      const newData = cloneDeep(previewURLs);
      newData.splice(index, 1);
      setPreviewURLs(newData);
    },
    [previewURLs]
  );

  const handleFileOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (!event.target.files) return;
      const file = event.target.files[0];
      const compressedImage = (await compressImage(file)) as File;
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewURLs(prev => [
          ...prev,
          { url: reader.result as string, blob: compressedImage }
        ]);
      };
      if (compressedImage) reader.readAsDataURL(compressedImage);
    },
    []
  );

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }]
        ],
        handlers: {
          image: () => {
            if (previewURLs.length >= 2) return;
            fileRef.current?.click();
          }
        }
      }
    };
  }, [previewURLs]);

  return (
    <BasicLayout headerTitle="커뮤니티 글작성" back={true} footer={true}>
      <CommunityEditorBlock>
        <input
          ref={fileRef}
          id="file"
          type="file"
          onChange={handleFileOnChange}
          hidden={true}
        />

        <QuillNoSSRWrapper
          modules={modules}
          formats={quilFormats}
          theme="snow"
          value={value || ""}
          onChange={(content, delta, source, editor) =>
            setValue(editor.getHTML())
          }
        />

        {previewURLs.map((url, index) => (
          <div className="image" key={index}>
            <img src={url.url} alt="커뮤니티 추가 이미지" />
            <div className="image__close" onClick={() => deleteImage(index)}>
              <CancelIcon />
            </div>
          </div>
        ))}
      </CommunityEditorBlock>
    </BasicLayout>
  );
};

const CommunityEditorBlock = styled.article`
  .image {
    position: relative;
    &__close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 2px;
      background: white;
      width: 25px;
      border-radius: 50%;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default Index;
