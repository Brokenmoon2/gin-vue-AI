<template>
  <div>
    <a-modal
        width="30%"
        title="文章更新"
        modal-class="gvb_article_modal_body"
        :visible="props.visible" @cancel="closeModal"
        :on-before-ok="okHandler">
      <a-form ref="formRef" :model="form">
        <a-form-item field="title" label="文章标题" :rules="[{required:true,message:'请输入文章标题'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="文章标题"></a-input>
        </a-form-item>
        <a-form-item field="abstract" label="文章简介">
          <a-textarea v-model="form.abstract" placeholder="文章简介" :auto-size="{minRows: 4, maxRows: 5}"></a-textarea>
        </a-form-item>
        <a-form-item field="category" label="文章分类">
          <a-select placeholder="文章分类" v-model="form.category" allow-create :options="categoryOptions"></a-select>
        </a-form-item>
        <a-form-item field="tags" label="文章标签">
          <a-select placeholder="文章标签" multiple v-model="form.tags" allow-create :options="tagOptions"></a-select>
        </a-form-item>
        <a-form-item label="文章封面">
          <a-select v-model="form.banner_id" placeholder="选择封面" @change="bannerChange" allow-clear>
            <a-option v-for="item in imageIdList" :value="item.id" :key="item.id">
              <div class="banner_image_div">
                <img height="40" :src="item.path" alt=""> {{ item.name }}
              </div>
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="原文地址">
          <a-input v-model="form.link" placeholder="原文地址"></a-input>
        </a-form-item>
        <a-form-item label="文章来源">
          <a-input v-model="form.source" placeholder="文章来源"></a-input>
        </a-form-item>
        <a-form-item label="预览" content-class="preview_body">
          <Gvb_article_item :data="form"></Gvb_article_item>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
// 1. 首先定义 props 和 emits
const props = defineProps<{
  visible: boolean;
  data: articleUpdateType;
}>()

const emits = defineEmits(["update:visible", "ok"])

// 2. 使用 ref 和 reactive 来定义响应式数据
import { reactive, ref, watch } from "vue";
import type { articleDataType, articleUpdateType } from "@/api/article_api";
import { articleCategoryListApi, articleUpdateApi } from "@/api/article_api";
import { tagOptionsApi } from "@/api/tag_api";
import { imageIdListApi } from "@/api/image_api";
import type { optionType, imageIdType } from "@/types";
import { Message } from "@arco-design/web-vue";
import Gvb_article_item from "@/components/common/gvb_article_item.vue";
import { Random } from "mockjs";

// 定义响应式数据
const form = reactive<articleUpdateType & articleDataType>({
  id: "",
  collects_count: Random.integer(0, 100),
  comment_count: Random.integer(0, 100),
  created_at: new Date(),
  digg_count: Random.integer(0, 100),
  look_count: Random.integer(0, 100),
})

// 3. 监听 props.data 变化，更新 form 数据
watch(() => props.data, () => {
  Object.assign(form, props.data)
}, { deep: true })

// 4. 定义响应式数据和获取分类、标签、图片等数据的异步函数
const categoryOptions = ref<optionType[]>([])
const tagOptions = ref<optionType[]>([])
const imageIdList = ref<imageIdType[]>([])

async function getArticleCategory() {
  let res = await articleCategoryListApi()
  categoryOptions.value = res.data
}

async function getTags() {
  let res = await tagOptionsApi()
  tagOptions.value = res.data
}

async function getImageList() {
  let res = await imageIdListApi()
  imageIdList.value = res.data
}

// 获取数据
getArticleCategory()
getTags()
getImageList()

// 5. banner 选择变化时，更新 form.banner_url
function bannerChange(val: number) {
  const image = imageIdList.value.find((item) => item.id === val)
  form.banner_url = image?.path || ""
}

// 6. 确认按钮点击处理函数
const formRef = ref()

async function okHandler() {
  let v = await formRef.value.validate()
  if (v) return
  let res = await articleUpdateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("update:visible", false)
  emits("ok")
}

// 7. 关闭 modal 函数
function closeModal() {
  emits("update:visible", false)
}
</script>

<style lang="scss">
.banner_image_div {
  display: flex;
  align-items: center;
  padding: 5px 0;

  img {
    margin-right: 5px;
    border-radius: 5px;
  }
}

.preview_body {
  max-width: inherit;
}

.gvb_article_modal_body .arco-modal-body {
  overflow-x: hidden;
}
</style>
