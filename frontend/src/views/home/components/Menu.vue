<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useQuery } from '@vue/apollo-composable';
import { type IUser } from '@/typescript/interfaces/IUser.ts';
import { gql } from "@apollo/client/core";


const GET_USER = gql`
  query {
    user {
      id
      email

    }
  }
`;

const { result, loading, error } = useQuery<{ user: IUser }>(GET_USER);

console.log(result);

</script>

<template>
  <Menubar class="rounded-none border-b border-none px-2 lg:px-4">
    <MenubarMenu>
      <MenubarTrigger class="font-bold">
        Музыка
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          Hide Music... <MenubarShortcut>⌘H</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Hide Others... <MenubarShortcut>⇧⌘H</MenubarShortcut>
        </MenubarItem>
        <MenubarShortcut />
        <MenubarItem>
          Quit Music <MenubarShortcut>⌘Q</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger class="hidden md:block">
        Аккаунт
      </MenubarTrigger>
      <MenubarContent>
        <MenubarLabel inset>
          Переключить аккаунт
        </MenubarLabel>
        <MenubarSeparator />
        <MenubarRadioGroup model-value="benoit">
          <MenubarRadioItem value="andy">
            1 акк
          </MenubarRadioItem>
          <MenubarRadioItem value="benoit">
            {{  result.user.email }}
          </MenubarRadioItem>
          <MenubarRadioItem value="Luis">
            3 акк
          </MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarItem inset>
          Настройки
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset>
          Добавить аккаунт
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
