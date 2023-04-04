import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  Button,
  ModalFooter
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";

import { User } from "../../../types/user";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  user: User | null | undefined;
  isOpen: boolean;
  isAdmin?: boolean;
  onClose: () => void;
};

export const UserDetailModal: VFC<Props> = memo((props) => {
  const { user, isOpen, isAdmin = false, onClose } = props;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setUsername(user?.username ?? "");
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
  }, [user]);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onClickUpdate = () => {
    alert("更新");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>名前</FormControl>
            <Input
              value={username}
              onChange={onChangeUserName}
              isReadOnly={!isAdmin}
            />
            <FormControl>フルネーム</FormControl>
            <Input value={name} isReadOnly={!isAdmin} onChange={onChangeName} />
            <FormControl>メール</FormControl>
            <Input
              value={email}
              isReadOnly={!isAdmin}
              onChange={onChangeEmail}
            />
            <FormControl>電話番号</FormControl>
            <Input
              value={phone}
              isReadOnly={!isAdmin}
              onChange={onChangePhone}
            />
          </Stack>
          {isAdmin && (
            <ModalFooter>
              <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
            </ModalFooter>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
