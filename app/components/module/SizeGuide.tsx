"use client";
import React from "react";
import bodySize from "../../../public/body-size.jpg";
import jeansSize from "../../../public/jeans-size.jpg";
import shirtsSize from "../../../public/shirts-size.jpg";
import taloringSize from "../../../public/taloring-size.jpg";
import trousersSize from "../../../public/trousers-size.jpg";
import clothesSize from "../../../public/clothesSize.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";

interface BackdropProps {
  backdrop: "opaque" | "blur" | "transparent" | undefined;
}

const SizeGuide = () => {
  const sizeGuideImg = [
    { id: 1, image: bodySize.src },
    { id: 2, image: jeansSize.src },
    { id: 3, image: shirtsSize.src },
    { id: 4, image: taloringSize.src },
    { id: 5, image: trousersSize.src },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] =
    React.useState<BackdropProps["backdrop"]>("opaque");

  const handleOpen = (backdrop: BackdropProps["backdrop"]) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="">
        <Button
          className="rounded-sm bg-transparent capitalize flex items-center self-center w-[44px] h-[44px] z-10 !relative hover:bg-[rgba(0,0,0,.1)]    border-1 border-black  "
          key={"opaque"}
          isIconOnly
          radius="none"
          onPress={() => handleOpen("opaque")}
        >
          <Image alt={"clothesSize"} radius="none" width={24} height={24} src={clothesSize.src} />
        </Button>
      </div>
      <Modal
        className="max-sm:!mx-4 max-sm:mb-10"
        scrollBehavior="inside"
        size="5xl"
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 uppercase">
                size guide
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3">
                  {sizeGuideImg.map((item) => (
                    <Image alt={item.image} src={item.image} />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SizeGuide;
