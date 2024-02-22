# AutoTab
## Trabalho de conclusão de curso - Athos Matos

### Resumo
Este Trabalho apresenta o desenvolvimento de um aplicativo visado para a transcrição
automática de sons de guitarra e violão em tablaturas. O sistema é dividido em duas partes
principais: um cliente web, desenvolvido utilizando ReactJS, e um servidor operando
em segundo plano via WebSocket. O cliente web oferece uma interface intuitiva para a
interação com os módulos de processamento localizados no servidor, além de proporcionar
uma visualização detalhada das informações processadas, como tablaturas e as notas que
as compõem.
O servidor encapsula os módulos de processamento essenciais para a transcrição musical.
Entre eles, destacam-se três Redes Neurais Convolucionais (CNNs) especializadas na
identificação de elementos musicais. Duas dessas redes são dedicadas, respectivamente, a
notas e acordes, enquanto uma terceira, de caráter mais generalista, é capaz de abranger
ambas as situações. O módulo de criação de janelas de áudio - denominado pelo autor
como Audio Window Analyser (AWA) - utiliza o método Spectral Flux para detectar onsets
de áudio, que são então empregados para gerar as janelas de áudio ao serem alimentados
a rede neural resultam nas notas que compõem o som. Por fim, no módulo de geração das
tablaturas - TabGen - é utilizado o algoritmo de Yen para encontrar os k caminhos mais
curtos, a partir das notas identificadas, oferecendo transcrições para todos os gostos.


### Abstract
This work presents the development of an application aimed at the automatic transcription
of guitar and violão (a type of Portuguese guitar) sounds into tablatures. The system
is divided into two main parts: a web client, developed using ReactJS, and a server
operating in the background via WebSocket. The web client offers an intuitive interface
for interaction with the processing modules located on the server, in addition to providing
a detailed visualization of the processed information, such as tablatures and the notes
they comprise.
The server encapsulates the essential processing modules for musical transcription. Among
these, three Convolutional Neural Networks (CNNs) specialized in the identification of
musical elements stand out. Two of these networks are dedicated, respectively, to notes
and chords, while a third, more generalist in nature, is capable of covering both situations.
The audio window creation module - named by the author as Audio Window Analyser
(AWA) - uses the Spectral Flux method to detect audio onsets, which are then used to
generate audio windows that, when fed to the neural network, result in the notes that make
up the sound. Finally, in the tablature generation module - TabGen - Yen’s algorithm is
used to find the k shortest paths, from the identified notes, offering transcriptions for all
tastes.


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
