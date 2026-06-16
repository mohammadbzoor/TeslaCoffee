import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/getCroppedImg";
import "./card.css";

export default function PreviewCard({ title, description, imgUrl, newPrice, oldPrice, imgStyle }) {
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImg, setCroppedImg] = useState("");

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropSave = async () => {
    if (!croppedAreaPixels && !imgUrl) return;
    const cropped = await getCroppedImg(imgUrl, croppedAreaPixels);
    setCroppedImg(cropped);
    setShowCropper(false);
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100">
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        {imgUrl && showCropper ? (
          <>
            <Cropper
              image={imgUrl}
              crop={crop}
              zoom={zoom}
              aspect={5 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <Button
              variant="success"
              size="sm"
              style={{ position: "absolute", bottom: 10, left: 10, zIndex: 10 }}
              onClick={handleCropSave}
            >
              حفظ التعديل
            </Button>
          </>
        ) : (
          <Card.Img
            src={croppedImg || imgUrl || "https://via.placeholder.com/250x200?text=No+Image"}
            alt={title || "معاينة"}
            style={{
              height: "200px",
              objectFit: "cover",
              width: "100%",
              ...imgStyle,
              cursor: imgUrl ? "pointer" : "default"
            }}
            onClick={() => imgUrl && setShowCropper(true)}
            title={imgUrl ? "اضغط لتعديل الصورة" : undefined}
          />
        )}
      </div>
      <Card.Body className="text-center d-flex flex-column justify-content-between">
        <div>
          <h5 className="fw-bold">{title || "اسم الصنف"}</h5>
          <p className="text-muted small mb-2">{description || "وصف الصنف"}</p>
        </div>
        <div className="mb-2">
          <span className="text-danger fw-bold fs-5">
            {newPrice ? `${newPrice} د.أ` : "السعر الجديد"}
          </span>{" "}
          {oldPrice && (
            <span className="text-muted text-decoration-line-through">
              {oldPrice} د.أ
            </span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

PreviewCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  newPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  oldPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgStyle: PropTypes.object,
};
