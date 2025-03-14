<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { Separator } from '@/components/ui/separator'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Loader } from 'lucide-vue-next'
import AlbumArtwork from './components/AlbumArtwork.vue'
import Menu from './components/Menu.vue'
import PodcastEmptyPlaceholder from './components/PodcastEmptyPlaceholder.vue'

import Sidebar from './components/Sidebar.vue'
import UploadFile from "@/views/home/components/UploadFile.vue";

import type {IMusic} from "@/typescript/interfaces/IMusic.ts";

import {GET_MUSIC} from "@/views/home/data/MusicFragment.ts";


const { result, loading, error } = useQuery<{ getMusicList: IMusic }>(GET_MUSIC)

</script>

<template>
  <div class="hidden md:block">
    <Menu />
    <div class="border-t">
      <div class="bg-background">
        <div class="grid lg:grid-cols-5">
          <Sidebar  class="hidden lg:block" />
          <div class="col-span-3 lg:col-span-4 lg:border-l">
            <div class="h-full px-4 py-6 lg:px-8">
              <div  class="h-full space-y-6">
                <div class="space-between flex items-center">
                  <div class="ml-auto mr-4">
                    <UploadFile id="1"/>
                  </div>
                </div>
                <div
                  class="border-none p-0 outline-none"
                >
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h2 class="text-2xl font-semibold tracking-tight">
                        Слушают сейчас
                      </h2>
                    </div>
                  </div>
                  <Separator class="my-4" />
                  <div class="relative" v-if="result?.getMusicList">
                    <ScrollArea>
                      <div class="flex space-x-4 pb-4">
                        <AlbumArtwork
                          v-for="album in result?.getMusicList"
                          :key="album.id"
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
                  <PodcastEmptyPlaceholder v-if="!result && !loading" />
                  <div class="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed" v-if="loading">
                    <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center" >
                        Загрузка <Loader class="pt-2 animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
