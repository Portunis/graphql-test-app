<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'


import AlbumArtwork from './components/AlbumArtwork.vue'
import Menu from './components/Menu.vue'
import PodcastEmptyPlaceholder from './components/PodcastEmptyPlaceholder.vue'
import Sidebar from './components/Sidebar.vue'
import { listenNowAlbums, madeForYouAlbums } from './data/albums'
import { playlists } from './data/playlists'
import UploadFile from "@/views/home/components/UploadFile.vue";


import { useQuery } from '@vue/apollo-composable';
import { gql } from "@apollo/client/core";
import type {IMusic} from "@/typescript/interfaces/IMusic.ts";


const GET_MUSIC = gql`
query getMusicOne($id: String!, $authorId: String!) {
    getMusicOne(id: $id, authorId: $authorId) {
      title
      description
      url
    }
  }
`;

const { result, loading, error } = useQuery<{ getMusicOne: IMusic }>(GET_MUSIC, {
  variables: {id: 6, authorId: 1},
})

console.log(result);
</script>

<template>
  <div class="hidden md:block">
    <Menu />
    <div class="border-t">
      <div class="bg-background">
        <div class="grid lg:grid-cols-5">
          <Sidebar :playlists="playlists" class="hidden lg:block" />
          <div class="col-span-3 lg:col-span-4 lg:border-l">
            <div class="h-full px-4 py-6 lg:px-8">
              <Tabs default-value="music" class="h-full space-y-6">
                <div class="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="music" class="relative">
                      Музыка
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">
                      Подкасты
                    </TabsTrigger>
                  </TabsList>
                  <div class="ml-auto mr-4">
                    <UploadFile id="1"/>
                  </div>
                </div>
                <TabsContent
                  value="music"
                  class="border-none p-0 outline-none"
                >
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h2 class="text-2xl font-semibold tracking-tight">
                        Слушают сейчас
                      </h2>
                      <p class="text-sm text-muted-foreground">
                        Топ за сегодня
                      </p>
                    </div>
                  </div>
                  <Separator class="my-4" />
                  <div class="relative">
                    <ScrollArea>
                      <div class="flex space-x-4 pb-4">
                        <AlbumArtwork
                          v-for="album in listenNowAlbums"
                          :key="album.name"
                          :album="album"
                          class="w-[250px]"
                          aspect-ratio="portrait"
                          :width="250"
                          :height="330"
                        />
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <div class="mt-6 space-y-1">
                    <h2 class="text-2xl font-semibold tracking-tight">
                      Made for You
                    </h2>
                    <p class="text-sm text-muted-foreground">
                      Your personal playlists. Updated daily.
                    </p>
                  </div>
                  <Separator class="my-4" />
                  <div class="relative">
                    <ScrollArea>
                      <div class="flex space-x-4 pb-4">
                        <AlbumArtwork
                          v-for="album in madeForYouAlbums"
                          :key="album.name"
                          :album="album"
                          class="w-[150px]"
                          aspect-ratio="square"
                          :width="150"
                          :height="150"
                        />
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </TabsContent>
                <TabsContent
                  value="podcasts"
                  class="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h2 class="text-2xl font-semibold tracking-tight">
                        New Episodes
                      </h2>
                      <p class="text-sm text-muted-foreground">
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator class="my-4" />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
