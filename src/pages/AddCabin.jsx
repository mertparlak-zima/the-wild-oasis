import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table-form">
        <Button>Add new cabinssss</Button>
      </Modal.Open>
      <Modal.Window name="table-form">
        <CreateCabinForm />
      </Modal.Window> */}
    </Modal>
  );
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add New Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal>
//           <CreateCabinForm onCloseModal={setIsOpenModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }
