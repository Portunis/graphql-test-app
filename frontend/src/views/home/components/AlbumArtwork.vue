<script setup lang="ts">
import type { Album } from '../data/albums'
import { cn } from '@/lib/utils'

interface AlbumArtworkProps {
  album: Album
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}
withDefaults(defineProps<AlbumArtworkProps>(), {
  aspectRatio: 'portrait',
})
</script>

<template>
  <div :class="cn('space-y-3', $attrs.class ?? '')">
        <div class="overflow-hidden rounded-md" v-if="album.cover">
          <img
            :src="album.cover"
            :alt="album.title"
            :width="width"
            :height="height"

            :class="cn(
              'h-auto w-auto object-cover transition-all hover:scale-105',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"
          >
        </div>
    <div class="space-y-1 text-sm">
      <h3 class="font-medium leading-none">
        {{ album.title }}
      </h3>
      <p class="text-xs text-muted-foreground">
        {{ album.description }}
      </p>
    </div>
  </div>
</template>
