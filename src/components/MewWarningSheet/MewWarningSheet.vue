<template>
  <div class="mt-4">
    <v-row
      class="mx-0"
      align="end"
      justify="center"
    >
      <v-sheet
        class="px-10 py-3 warning-sheet"
        color="warning"
        height="100%"
        width="100%"
      >
        <v-row
          align="start"
          justify="start"
        >
          <v-col cols="auto">
            <v-icon
              class="title"
              color="warning darken-2"
            >
              mdi-alert
            </v-icon>
          </v-col>
          <v-col class="d-flex flex-column titlePrimary--text">
            <span class="text-uppercase font-weight-bold">{{ title }}</span>
            <span>
              {{ description }}
            </span>
            <span>
              <a
                :href="linkObj.url"
              >{{ linkObj.title }}
              </a>
            </span>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'MewWarningSheet',
  /**
   * The title of the warning sheet.
   */
  props: {
    title: {
      type: String,
      default: ''
    },
    /**
     * The description of the warning sheet.
     */
    description: {
      type: String,
      default: ''
    },
    /**
     * Applies the link url to the end of the text. Takes title and url, i.e. {title: '', url: ''}
     */
    linkObj: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
}
</script>

<style lang="scss">
.warning-sheet {
  border-radius: 10px;
}

</style>