"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface GroupJoinConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function GroupJoinConfirmModal({
  open,
  onOpenChange,
  groupName,
  onCancel,
  onConfirm,
  isLoading = false,
}: GroupJoinConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>이 그룹에 참여하시겠습니까?</DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">{groupName}</span> 그룹에 참여하면 그룹 멤버들과 함께 식사를 계획할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "참여 중..." : "참여하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
