<template>
    <div class="home">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginContent",
}
</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
}

.container {
    position: absolute;
    height: 350px;
    width: 600px;
    background-color: rgba(255, 255, 255, .9);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(17, 39, 59, 0.8);
    border: 1px solid rgba(17, 39, 59, 1);
    overflow: hidden;
    box-sizing: border-box;
    opacity: 0;
    transition: 1s;
}

.container-show {
    transform: translate(-50%, -50%);
    opacity: 1;
}

.container:hover .title {
    font-size: 20px;
    /* transform: translate(0,-30%); */
}

.container:hover input {
    transform: translate(0, -30%);
}

.container:hover .btn {
    height: 30px;
    width: 90px;
    transform: translate(0, -30%);
    font-size: 12px;
}

.container:hover .change-box {
    height: 200px;
}

.container:hover .change-btn {
    display: block;
}
</style>