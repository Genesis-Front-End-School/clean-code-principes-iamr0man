<template>
  <div class="mt-20 flex flex-col justify-center items-center text-center">
    <p
      class="text-6xl font-bold bg-gradient-to-r from-purple-300 via-purple-800 to-purple-700 bg-clip-text"
    >
      Sorry, the course you are looking for <br />
      cannot be found or there seems <br />
      to be an error.
    </p>
    <p
      class="mt-6 text-3xl bg-gradient-to-r from-purple-200 via-purple-600 to-purple-500 bg-clip-text"
    >
      Please try again, and if the error persists, please try again later.
    </p>
    <button
      type="button"
      class="mt-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      @click="$router.go(-1)"
    >
      Return back
    </button>
  </div>
</template>
