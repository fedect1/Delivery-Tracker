import { DataTable, FabAddNew, ModalChangeStatus, ModalNewOrder, Navbar} from "../"


export const OrderPage = () => {

  return (
    <>
     <Navbar />
     <ModalNewOrder />
     <ModalChangeStatus />
     <FabAddNew />
     <DataTable />
    </>
  )
}

