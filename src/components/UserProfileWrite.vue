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

export default {
    name: "UserProfileWrite",

    setup(props,context) {
        let content = ref('');

        const postApost = () => {
            context.emit("postApost",content.value)
            content.value = "";
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