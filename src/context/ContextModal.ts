


// import { createContext, useContext, useState, ReactNode } from "react";

// type ModalContextType = {
//   isOpen: boolean;
//   openModal: () => void;
//   closeModal: () => void;
// };

// const ModalContext = createContext<ModalContextType | null>(null);

// export function ModalProvider({ children }: { children: ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <ModalContext.Provider
//       value={{
//         isOpen,
//         openModal: () => setIsOpen(true),
//         closeModal: () => setIsOpen(false),
//       }}
//     >
//       {children}
//     </ModalContext.Provider>
//   );
// }

// export function useModal() {
//   return useContext(ModalContext)!;
// }
