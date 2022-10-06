# List of content

1. [Description](#bluzelle-discord-bot)
2. [Website](#website)
3. [Video Tutorial](#video-tutorial)
4. [How to create a bot](#how-to-create-bot)
5. [Tutorial to setup local development](#tutorial-to-setup-local-development)
6. [Run the discord server bot in vps](#run-the-discord-server-bot-in-vps)



# Bluzelle Discord Bot

This is a discord server bot that you can use to get data from bluzelle network easily, currently all data is still using testnet, you can see all of the data of bluzelle in  big dipper of testnet itself [here](https://bigdipper.testnet.private.bluzelle.com/), this application consist of two application at once, frontend and backend which then can be use easily using docker compose in your own vps.



# Video Tutorial

<center><a href="https://www.youtube.com/watch?v=N7SXptPXXa4"><img src="https://img.youtube.com/vi/N7SXptPXXa4/0.jpg"/></a></center>

# How to create bot

1. open `https://discord.com/developers/applications`
2. click `new application`

![image](https://user-images.githubusercontent.com/62529025/125548777-0ea7f41a-6dee-4785-9dae-67ade244ac4b.png)

3. named your application whatever you want and click create

![image](https://user-images.githubusercontent.com/62529025/125548895-34f69010-d5f3-403a-9cbd-4418ab6272a3.png)

4. click bot and click `add bot`

![tempsnip](https://user-images.githubusercontent.com/62529025/125549069-df689f0c-e5eb-4e52-986e-b812452c17df.png)

5. now click `oauth2` then set the bot by clicking `bot`, `application.commands`, `Send Message`, `Embed Link` and copy paste the invite link like below :

![tempsnip](https://user-images.githubusercontent.com/62529025/125604094-62cd7e43-c55b-47dc-a81a-c7fd7accd985.png)

6. open that on your browser and add it to your discord server :

![image](https://user-images.githubusercontent.com/62529025/125549422-42b78d6b-8339-4b3e-b057-90874ddfed8b.png)

7. after you see something like below you successfully added your bot into your server

![image](https://user-images.githubusercontent.com/62529025/125549449-b982800b-1401-4c3f-8332-7b90c1964e55.png)

8. this bot still can't do nothing we need to run the server whether its in local or in our vps see how to set it up down below

# Tutorial to setup local development

1. after you clone this repo, create an environment variable called `.env` and put it in `src` folder you can see the `.env.example` for example of variable that need to be added in order for this bot to work

```
DISCORD_TOKEN=
DISCORD_INVITE=
WEBSITE=
```

you can get `DISCORD_TOKEN` variable if you go to `https://discord.com/developers/applications` and go to your bot application.

![image](https://user-images.githubusercontent.com/62529025/125549712-0a64fc2c-d32c-433f-a008-e82419960f85.png)

copy that token and put it in `DISCORD_TOKEN` environment variable, for the `DISCORD_INVITE` variable you can go to oauth2 on your discord application dashboard then copy paste the discord invite url like below :

![tempsnip](https://user-images.githubusercontent.com/62529025/125547780-e385bbe1-4c6c-403c-af40-47931b4b0f18.png)

in local you don't need to setup `WEBSITE` environment variable as it is used for our bot to know which website to go to when user click `COMMAND LIST` button on our discord server, to know what each command is for and to get to know example of how it look like, below is the example when you issue `/help` command in the discord server, `COMMAND LIST` button will show up:

![tempsnip](https://user-images.githubusercontent.com/62529025/125548078-42e9c324-3202-40e0-aee1-52dd1cab044f.png)

and this is the example when that button clicked it will show this webpage :

![image](https://user-images.githubusercontent.com/62529025/125548358-7c27ac06-45fe-44d6-8cc6-f31a0fcb00e1.png)

3. After you done setting up your environment variable go to your vscode terminal, and issue this command :

```bash
npm install 
npx ts-node-dev src/index.ts
```
if it show `Ready!` in console your bot is ready to use

![image](https://user-images.githubusercontent.com/62529025/125548655-26ba4eb5-996a-42ee-b8b3-f503c826019d.png)

and then after that if you see your discord server, your bot is now online which means we can interact with it

![image](https://user-images.githubusercontent.com/62529025/125549850-40fd3099-76eb-48da-b5de-db371c321a4e.png)

4. If you want to show the slash command that can be used on this server you need to issue `!deploy` command first, see below for example:

![command](https://i.gyazo.com/d31b846559c8f8c89c786f40cb370108.gif)

5. now you can see list of command that you can use, this bot server is using the latest [slash command](https://discord.com/developers/docs/interactions/slash-commands#:~:text=Images-,Slash%20Commands,features%20as%20you%20add%20them.) by discord which make it easy to issue a command, try to use `/help` command like below :

![image](https://i.gyazo.com/c2a4055a68a1e6bf8fc4b34fe159a15e.gif)

6. if you click on `COMMAND LIST` button basically you will go to a blank page in `http://localhost:3000/commands`

![image](https://user-images.githubusercontent.com/62529025/125551416-8f7d55c5-a90b-4e3e-840b-7d0238fc4e9e.png)

7. so in order to run the frontend issue this command in new terminal but in the same folder :

```
cd discord-page
npm install
npm run dev
```

8. Now when you go to `localhost:3000` or when clicking `COMMAND LIST` button in discord server you will see something like this:

![image](https://user-images.githubusercontent.com/62529025/125551586-a26aff62-8678-434e-b316-770021512389.png)

9. now you can edit the code whatever you like it, because this discord bot is using typescript,you can easily see the type and some of the desciprtion of what particular command does.

# Run the discord server bot in vps

1. in order to run this on vps you need to ssh to your vps first after that you need to run this command in your terminal :

```
git clone https://github.com/spiritbro1/bluzelle-discord.git
cd bluzelle-discord
sudo su
```
2. run this command `cp .env.example .env` to create an `.env` file
3. edit this `.env` file just like you edit it in local the different is you should add the `WEBSITE` variable with the domain that goes to your ip address or just use your ip address, so the `WEBSITE` environment variable will be like this `http://<your ip address>` or `http://<your domain name>`

```
DISCORD_TOKEN= # same as in local dev
DISCORD_TOKEN= # same as in local dev
WEBSITE=# http://<your domain or ip address> for example http://bluzelle-discord.com or http://61.22.22.21
```

4. then run `bash build.sh` wait for it to complete after it complete go to your vps ip address or domain name and you will see the exact same frontend that you get via local development you will also need to issue a `!deploy` command in your discord server in order for you to use the slash command

# Contributing

feel free to create a pull request if you had any new ideas

---------------------------------
translate indonesian

# Penalaran Fitur Berulang untuk Gambar Inpainting
Diterima di [CVPR 2020](https://openaccess.thecvf.com/content_CVPR_2020/html/Li_Recurrent_Feature_Reasoning_for_Image_Inpainting_CVPR_2020_paper)
## Persyaratan

Python >= 3.5

PyTorch >= 1.0.0

Opencv2 = 3.4.1

Scipy == 1.1.0

Numpy == 1.14.3

Scikit-gambar (skimage) == 0.13.1

Ini adalah lingkungan untuk eksperimen kami. Versi selanjutnya dari paket ini mungkin memerlukan beberapa modifikasi kode.

Meskipun metode kami tidak terbatas pada versi CUDA dan cudnn tertentu, sangat disarankan agar Anda menggunakan versi terbaru dari toolkit ini. Tampaknya RFR-Net dapat berjalan lambat di versi CUDA yang lebih lama karena desainnya yang berulang.

## Model Terlatih

Tautan ke model yang telah dilatih sebelumnya. (Saat ini, kumpulan data Paris StreetView, CelebA). Kami mengharapkan untuk merilis bobot Places2 sebelum akhir Januari, kami mohon maaf atas keterlambatan yang disebabkan oleh kegagalan dalam sistem penyimpanan kami.

https://drive.google.com/drive/folders/1EbRSL6SlJqeMliT9qU8V5g0idJqvirZr?usp=sharing

Kami sangat mendorong pengguna untuk melatih kembali model jika digunakan untuk tujuan akademis, untuk memastikan perbandingan yang adil (yang selalu diinginkan). Mencapai kinerja yang baik menggunakan versi kode saat ini seharusnya tidak sulit.

## Hasil (Dari model yang telah dilatih sebelumnya)

| ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/masked_img_321.png) | ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/img_321.png) | ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/masked_img_326.png) | ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/img_326.png) |
| -------------------------------------------------- ---------- | -------------------------------------------------- ---------- | -------------------------------------------------- ---------- | -------------------------------------------------- ---------- |
| ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/masked_img_106.png) | ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/img_106.png) | ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/masked_img_586.png) | ![avatar](https://github.com/jingyuanli001/RFR-Inpainting/blob/master/results/img_586.png) |



## Reproduksibilitas

Kami telah memeriksa reproduktifitas hasil di koran.
| |Direproduksi|
|:----:|:----:|
|Paris StreetView|Benar|
|CelebA|Benar|

## Menjalankan program

Untuk melakukan pelatihan atau pengujian, gunakan
```
python run.py
```
Ada beberapa argumen yang dapat digunakan, yaitu
```
--data_root +str #di mana mendapatkan gambar untuk pelatihan/pengujian
--mask_root +str #di mana mendapatkan masker untuk pelatihan/pengujian
--model_save_path +str #tempat menyimpan model selama pelatihan
--result_save_path +str #tempat menyimpan hasil inpainting selama pengujian
--model_path +str #generator terlatih untuk digunakan selama pelatihan/pengujian
--target_size +int #ukuran gambar dan topeng
--mask_mode +int #masker jenis apa yang akan digunakan, 0 untuk masker eksternal dengan urutan acak, 1 untuk masker yang dibuat secara acak, 2 untuk masker eksternal dengan urutan tetap
--batch_size +int #ukuran mini-batch untuk pelatihan
--n_threads +int
--gpu_id +int #gpu mana yang akan digunakan
--finetune #untuk menyempurnakan model selama pelatihan
--test #test modelnya
```
Misalnya, untuk melatih jaringan menggunakan GPU 1, dengan model yang telah dilatih sebelumnya
```
python run.py --data_root data --mask_root mask --model_path checkpoints/g_10000.pth --batch_size 6 --gpu 1
```
untuk menguji jaringan
```
python run.py --data_root data/images --mask_root data/masks --model_path checkpoints/g_10000.pth --test --mask_mode 2
```
RFR-Net untuk mengisi lubang yang lebih kecil ditambahkan. Satu-satunya perbedaan adalah jumlah piksel yang lebih kecil yang diperbaiki di setiap iterasi. Jika Anda memperbaiki lubang kecil, Anda dapat menggunakan versi kode tersebut, untuk mendapatkan beberapa peningkatan.
## Prosedur pelatihan
Untuk sepenuhnya memanfaatkan kinerja jaringan, kami menyarankan untuk menggunakan prosedur pelatihan berikut, khususnya:

1. Latih jaringan, yaitu gunakan perintah
```
python run.py
```

2. Sempurnakan jaringan, mis. gunakan perintah
```
python run.py --finetune --model_path path-to-trained-generator
```

3. Uji modelnya
```
python run.py --test
```
## Berapa lama melatih model

Semua deskripsi di bawah ini dengan asumsi ukuran mini-batch adalah 6

Untuk Kumpulan Data Paris Street View, latih model untuk 400.000 iterasi dan sempurnakan untuk 200.000 iterasi. (Total 600.000)

Untuk CelebA Dataset, latih model untuk 350.000 iterasi dan sempurnakan untuk 150.000 iterasi. (totalnya 500.000)

Untuk Kumpulan Data Tantangan Places2, latih model untuk 2.000.000 iterasi dan sempurnakan untuk 1.000.000 iterasi. (total 3.000.000)

## Organisasi kode ini

Bagian ini untuk orang yang ingin membangun metode mereka sendiri berdasarkan kode ini.

Inti dari kode ini adalah file `model.py`. Secara khusus, ini mendefinisikan organisasi t







