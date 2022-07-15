<template>
    <div class="card edit-field">
        <div class="card-body">
            <div class="mb-3">
                <label for="EditPost" class="form-label">Write Your Post</label>
                <textarea v-model="content" class="form-control" id="EditPost" rows="3"></textarea>
                <button @click="postApost" type="button" class="btn btn-success">Send</button>
            </div>

        </div>
    </div>

</template>

<script>
import { ref } from 'vue';
import $ from 'jquery'
import { useStore } from 'vuex';

export default {
    name: "UserProfileWrite",

    setup(props, context) {
        let content = ref('');
        const store = useStore();

        const postApost = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "POST",
                data: {
                    content: content.value,
                },
                headers: {
                    "Authorization": "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result == "success") {
                        context.emit("postApost", content.value)
                        content.value = "";
                    }
                }
            });

            /*  context.emit("postApost", content.value)
              content.value = "";*/
        }
        return {
            content,
            postApost,
        }
    }
}
</script>

<style scoped>
.edit-field {
    margin-top: 20px;
}

button {
    margin-top: 10px;
}
</style>