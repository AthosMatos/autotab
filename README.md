# AutoTab
## Trabalho de conclusão de curso - Athos Matos

### Abstract
This monograph proposes a tool capable of identifying musical notes in audio tracks of
guitar and guitar and providing the results in tablature format. The tool consists of various
modules distributed between a client and a server where the client is a web application
aimed at facilitating the tool’s use. Furthermore, the application houses the transcription
module responsible for generating the tablature. The server encompasses the auditory event
detection algorithm and two Convolutional Neural Networks (CNNs) trained to identify
individual notes or sound harmonies such as musical chords. Utilizing the identifying
capability of CNNs and working in conjunction with pre and post-processing algorithms,
the proposed tool has shown itself capable of accurately identifying notes and chords where
the sound is clear, clean (without effects such as reverb, delay, distortion, etc.), and
well-spaced. This work delves into libraries such as librosa, scipy, and tensorflow, which
were key components for the tool’s performance and quality. This monograph also serves as
an analytical guide on how to handle acoustic signals and generate data from them, while
highlighting the limitations and shortcomings of the proposed architecture, thus enabling
the creation of other musical transcription tools with better efficiency and capability.

![AutoTabImage - Ooh la la - Faces](https://github.com/AthosMatos/autotab/assets/74662402/d1bac0b8-6406-487c-81ec-c2a3d48027a7)

# Installation
## Windows
* Install and Run Docker

# Running
## Windows
### If not built
run buildNexecute.bat
### If built
run execute.bat

# More information
Dataset link - https://drive.google.com/drive/folders/1NQQJtMrtM6JdrB8MznYN2_0YIkImVnN4?usp=sharing
