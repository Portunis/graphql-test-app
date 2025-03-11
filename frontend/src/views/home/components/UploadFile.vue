<template>
  <Dialog>
    <DialogTrigger>
      <Button>
        <PlusCircleIcon class="mr-2 h-4 w-4" />
        Добавить музыку
      </Button>
    </DialogTrigger>
    <DialogContent>


        <Input placeholder="Введите название трека" v-model="title" :disabled="uploading"/>
        <Input v-model="description" placeholder="Введите описание" :disabled="uploading"/>
        <div class="flex items-center justify-center p-2" :class="{'opacity-25': uploading}">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="handleFileChange"
              :disabled="uploading"
            />
          </label>
        </div>
      <div v-if="uploading" class="mt-4">
        <Progress v-model="progress" :max="100" class="w-full" />
      </div>
      <Button @click.prevent="uploadFile" :disabled="uploading">Загрузить</Button>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import axios from "axios";
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {PlusCircleIcon} from 'lucide-vue-next'
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/toast";


type IProps = {
  id: string
}

const props = defineProps<IProps>()

    const uploading = ref(false);
    const progress = ref(0);
    const file = ref(null);
    const title = ref('');
    const description = ref('');


    const uploadFile = async () => {
      if(!file) return
      uploading.value = true;
      const formData = new FormData();
      formData.append("audio", file.value);
      formData.append("authorId", props.id);
      formData.append("title", title.value);
      formData.append("description", description.value);

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
        });

        if (response.status === 200) {
          toast({
            description: `Файл ${response.data.title} загружен`,
          })

          file.value = null;
          title.value = '';
          description.value = '';

        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        uploading.value = false;
      }
    };

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        file.value = selectedFile;
      }
    };


</script>
