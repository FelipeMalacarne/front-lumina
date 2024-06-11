import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

type DeleteDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: () => void;
};

export const DeleteDialog = ({ onConfirm, open, setOpen }: DeleteDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:min-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Excluir Item</DialogTitle>
                    <DialogDescription>
                        Você tem certeza que deseja deletar esse item?
                        Essa ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button variant={'destructive'} type="button" onClick={onConfirm}>
                        Deletar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
