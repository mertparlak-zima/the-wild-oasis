import styled from "styled-components";
import { formatCurrency, getImageNameFromUrl } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../../hooks/useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { FaCopy } from "react-icons/fa";
import { useCreateCabin } from "../../hooks/useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const currentImage = getImageNameFromUrl(cabin.image);
  const { isPending, deleteCabin } = useDeleteCabin({ cabin, currentImage });
  const { isPending: isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      image: cabin.image,
    });
  }

  return (
    <TableRow role="row">
      <Img src={cabin.image} alt={cabin.name} />
      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.maxCapacity}</div>
      <Price>{formatCurrency(cabin.regularPrice)} kr</Price>
      {cabin.discount ? (
        <Discount>{formatCurrency(cabin.discount)}%</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button
          onClick={() => handleDuplicate()}
          disabled={isCreating || isPending}
        >
          <FaCopy />
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button disabled={isPending || isCreating}>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button disabled={isPending || isCreating}>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourec={cabin.name}
              disabled={isPending || isCreating}
              onConfirm={() => deleteCabin(cabin.id, currentImage)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}
