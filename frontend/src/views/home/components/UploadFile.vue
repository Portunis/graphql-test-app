<template>
  <Dialog :open="isOpenModal" >
    <DialogTrigger>
      <Button @click="isOpenModal = true">
        <PlusCircleIcon class="mr-2 h-4 w-4" />
        Добавить музыку
      </Button>
    </DialogTrigger>
    <DialogContent>
    <div class="relative mt-5" :class="{'bg-white z-10':uploading}">
      <Input class="mb-2 mt-5" placeholder="Введите название трека" v-model="title" :disabled="uploading"/>
      <Input v-model="description" placeholder="Введите описание" :disabled="uploading"/>
      <div v-if="!uploading" class="flex items-center justify-center mt-2 mb-2 w-full flex-col" :class="{'opacity-25': uploading}">
        <div class="flex flex-col w-full">
          <p class="pb-2 pt-2 ">Музыка</p>
          <label
            v-if="!trackName"
            for="dropzone-file-music"
            class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Нажмите чтобы загрузить</span> или перетащите файл
              </p>
            </div>
            <input
              id="dropzone-file-music"
              type="file"
              class="hidden"
              @change="handleFileMusic"
              :disabled="uploading"
            />
          </label>
          <div v-if="trackName" class="relative flex items-center justify-between">
          <p v-if="trackName" class="text-sm text-gray-500 dark:text-gray-400">{{ trackName }}</p>
            <div class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">

              <X class="w-4 h-4"  @click="trackName = ''"/>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-4 flex items-center justify-center w-full z-50" v-if="uploading">
        <div class="w-full flex items-center justify-center flex-col">
          <p>{{ progress }}%</p>
          <Progress v-model="progress" :max="100" class="w-full" />
        </div>
      </div>
      <Button @click.prevent="uploadFile" :disabled="uploading">Загрузить</Button>
    </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import axios from "axios";
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {PlusCircleIcon, X} from 'lucide-vue-next'
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/toast";


type IProps = {
  id: string
}

    const props = defineProps<IProps>()


    const isOpenModal = ref(false);
    const uploading = ref(false);
    const progress = ref(0);
    const fileMusic = ref(null);
    const  trackName = ref('');
    const title = ref('');
    const description = ref('');
    let uploadCancelToken = null;

    const uploadFile = async () => {
      if(!fileMusic) return
      uploading.value = true;
      const formData = new FormData();
      formData.append("audio", fileMusic.value);
      formData.append("authorId", props.id);
      formData.append("title", title.value);
      formData.append("description", description.value);

      uploadCancelToken = axios.CancelToken.source();

      try {
        const response = await axios.post("http://192.168.0.183:4000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              console.log('load', event.loaded);
              progress.value = Math.round((event.loaded * 100) / event.total);
            }
          },
          cancelToken: uploadCancelToken.token,
        });

        if (response.status === 200) {
          toast({
            description:  response.data.message,
          })

          fileMusic.value = null;
          trackName.value = '';
          title.value = '';
          description.value = '';
          isOpenModal.value = false
          progress.value = 0;

        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        uploading.value = false;
      }
    };

    const handleFileMusic = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        fileMusic.value = selectedFile;
        trackName.value = selectedFile.name
      }
    };

    const stopUploadFile = () => {
      if (uploadCancelToken) {
        uploadCancelToken.cancel("Загрузка отменена пользователем");
        uploadCancelToken = null;
      }
      uploading.value = false;
      fileMusic.value = null;
    }


</script>
