  
<script>
export default {
  el: '#app',
  data() {
    return {
      originalURL: "",
      shortURL: "",
      generatedShortURL: "",
      qrCodeDataURL: "",
      urls: [],
    };
  },
  methods: {
    async generateShortURL() {

      if (this.originalURL.startsWith("https:") || this.originalURL.startsWith("http:")) {

        const response = await fetch("https://shorturl-generate.onrender.com/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalURL: this.originalURL }),
        });
        const data = await response.json();
        this.shortURL = data.shortURL;
        this.generatedShortURL = data.shortURL;
      } else if (this.originalURL.startsWith("www.")) {

        alert("Please Input Full URL again");
      } else {
        alert("Please Input URL again");
      }
    },
    async fetchdata() {
      try {
        const response = await fetch('https://shorturl-generate.onrender.com/api/short');

        if (!response.ok) {
          throw new Error('ไม่สามารถเรียกข้อมูลได้');
        }

        this.urls = await response.json();

      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
      }
    },

    async sendShortURLToQRCodeAPI() {
      try {
        const response = await fetch("https://shorturl-generate.onrender.com/api/qrcode/" + this.generatedShortURL, {
          method: "GET",
        });

        if (response.ok) {

          const qrDataURL = await response.text();

          console.log(qrDataURL);
          this.qrCodeDataURL = qrDataURL;
        } else {
          console.error("Failed to generate QR code");
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    }
  }
};
</script>
 
<template>
  <div class="bg-blue-500 min-h-screen py-10">
    <div class="container mx-auto">
      <h1 class="text-center text-4xl font-bold text-white mb-6">Short URL Generator</h1>
      <div class="flex justify-center">
        <div class="box bg-white p-6 rounded-lg shadow-lg mb-20 w-full md:w-2/3 lg:w-1/2 xl:w-3/4">
          <div class="mb-4">
            <input v-model="originalURL" class="w-full px-4 py-2 border rounded-md" placeholder="Enter URL" />
          </div>
          <div class="flex justify-center space-x-4">
            <button @click="generateShortURL()"
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">Generate Short
              URL</button>
            <button @click="sendShortURLToQRCodeAPI()"
              class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">Generate QR CODE</button>
          </div>
          <div class="flex justify-center"> <img v-show="qrCodeDataURL" :src="qrCodeDataURL" alt="QR Code" />
          </div>
          <div v-if="qrCodeDataURL"> <a :href="qrCodeDataURL" download="qr-code.png"
              class=" flex justify-center text-xl">Download QR Code</a>
          </div>
          <p v-if="shortURL" class="mt-4 bg-green-100 px-4 py-2 rounded-lg">
            <strong>Short URL:</strong> <a :href="'https://shorturl-generate.onrender.com/' + shortURL" class="text-green-600">{{ shortURL
            }}</a>
          </p>
        </div>
      </div>
      <div class="bg-blue-500 min-h-screen py-10">
        <div class="container mx-auto">
          <h1 class="text-center text-4xl font-bold text-white mb-6">History</h1>
          <div class="mt-5 bg-white  p-6 ml-1 rounded-lg shadow-lg">
            <form @submit.prevent="fetchdata">
              <div class="flex justify-center">
                <button type="submit"
                  class=" px-4 py-2 bg-blue-500 hover:bg-blue-600  rounded-lg mb-5  text-white  ">History Short
                  URL</button>
              </div>
            </form>
            <table class="table table-auto border-collapse w-full">
              <thead>
                <tr class="bg-gray-300">
                  <th class="py-2 px-4 w-1/3 ">Original URL</th>
                  <th class="py-2 px-4 w-1/3 ">Short URL</th>
                  <th class="py-2 px-4 w-1/3 ">Click Count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="url in urls" :key="url.id" class="border-b">
                  <td class="py-2 px-4 ">
                    {{ url.originalURL }}
                  </td>
                  <td class="py-2 px-4 text-center">
                    <a :href="'https://shorturl-generate.onrender.com/' + url.shortURL"
                      class="text-blue-500 hover:underline pl-4 md:pl-1">{{ url.shortURL }}</a>
                  </td>
                  <td class="py-2 px-4 text-center">
                    {{ url.clickCount }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
<style scoped>
.box {
  width: 1550px;
}

td {
  width: 50px;
}
</style>

  

