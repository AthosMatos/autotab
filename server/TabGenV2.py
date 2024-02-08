# Importações necessárias
from itertools import product

def gerar_sequencia_notas(inicio, fim):
    notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    sequencia = []
    nota_inicio, oitava_inicio = inicio[:-1], int(inicio[-1])
    nota_fim, oitava_fim = fim[:-1], int(fim[-1])

    oitava_atual = oitava_inicio
    nota_atual = nota_inicio
    while oitava_atual < oitava_fim or (oitava_atual == oitava_fim and notas.index(nota_atual) <= notas.index(nota_fim)):
        sequencia.append(nota_atual + str(oitava_atual))
        if nota_atual == "B":
            oitava_atual += 1
        nota_atual = notas[(notas.index(nota_atual) + 1) % len(notas)]
    
    return sequencia

def preencher_nota_para_posicoes():
    # Afinação padrão da guitarra de 6 cordas (da mais aguda para a mais grave)
    afinacao = ["E4", "B3", "G3", "D3", "A2", "E2"]
    nota_para_posicoes = {}
    for i, nota_corda in enumerate(afinacao):
        sequencia_notas = gerar_sequencia_notas(nota_corda, "E6")
        traste = 0
        for nota in sequencia_notas:
            if nota not in nota_para_posicoes:
                nota_para_posicoes[nota] = []
            nota_para_posicoes[nota].append({"fret": traste, "string": 6 - i})
            traste += 1
            if traste > 24:  # Limitando ao 24º traste
                break
    return nota_para_posicoes

nota_para_posicoes = preencher_nota_para_posicoes()


def calcular_peso_combinacao(combinacao,parametros):
    peso = 0
    trastes = [posicao['fret'] for posicao in combinacao]
    cordas = [posicao['string'] for posicao in combinacao]

    # Proximidade das Notas (nos trastes)
    distancia_maxima_trastes = max(trastes) - min(trastes)
    peso += distancia_maxima_trastes * 10  # Penalidade por maior distância entre trastes

    # Proximidade nas Cordas
    cordas.sort()
    for i in range(1, len(cordas)):
        peso += (cordas[i] - cordas[i-1] - 1) * 5  # Penalidade por maior distância entre cordas adjacentes

    # Facilidade de Formação e Distribuição Balanceada
    # Ajuste baseado na distribuição das notas e padrões comuns de acordes
    peso += abs(4 - (trastes[-1] - trastes[0])) * 5  # Incentiva acordes dentro de uma extensão de 4 trastes

    # Ajuste para acordes com distribuição de notas em cordas consecutivas
    peso += (4 - len(set(cordas))) * 15  # Incentiva o uso de todas as cordas disponíveis no acorde
    
    # Ajuste pela proximidade à casa de conforto
    peso += sum([abs(traste - parametros['casa_conforto']) for traste in trastes])

    return peso


def encontrar_posicoes_acorde_com_peso(acorde,parametros):
    combinacoes_possiveis = [nota_para_posicoes[nota] for nota in acorde]
    combinacoes_acorde = list(product(*combinacoes_possiveis))

    acordes_validos_com_peso = []
    for combinacao in combinacoes_acorde:
        strings_usadas = [posicao['string'] for posicao in combinacao]
        if len(set(strings_usadas)) == len(acorde):
            peso = calcular_peso_combinacao(combinacao,parametros)
            acordes_validos_com_peso.append((combinacao, peso))

    # Ordenar as combinações pelo peso
    acordes_validos_com_peso.sort(key=lambda x: x[1])

    return acordes_validos_com_peso



def adaptar_output_para_formato_desejado(combinacoes_ordenadas_por_peso):
    resultados_formatados = []
    
    for combinacao, peso_total in combinacoes_ordenadas_por_peso:
        caminho_formatado = {
            'weight': peso_total,
            'path': []
        }
        
        for acorde_com_peso in combinacao:
            acorde, _ = acorde_com_peso  # Ignora o peso individual do acorde aqui
            posicoes_acorde_formatadas = []
            
            for posicao in acorde:
                posicao_formatada = {
                    'note': [nota for nota in nota_para_posicoes if posicao in nota_para_posicoes[nota]][0],
                    'pos': {
                        'string': str(posicao['string']-1),
                        'fret': str(posicao['fret'])
                    }
                }
                # Aqui você precisaria de um mapeamento real de posição para nota
                posicoes_acorde_formatadas.append(posicao_formatada)
            
            caminho_formatado['path'].append(posicoes_acorde_formatadas)
        
        resultados_formatados.append(caminho_formatado)
    
    return resultados_formatados


def gen_paths(sequencia_acordes, k,parametros):
    todas_combinacoes = []
    
    # Gera todas as combinações possíveis para a sequência de acordes
    def gerar_combinacoes(sequencia, combinacao_atual=[]):
        if not sequencia:
            todas_combinacoes.append(combinacao_atual)
            return
        primeiro_acorde = sequencia[0]
        posicoes_com_peso = encontrar_posicoes_acorde_com_peso(primeiro_acorde,parametros)
        for posicao in posicoes_com_peso[:k]:  # Considera apenas as top k posições para cada acorde
            gerar_combinacoes(sequencia[1:], combinacao_atual + [posicao])

    gerar_combinacoes(sequencia_acordes)

    # Calcula o peso total para cada combinação de posições de acordes
    combinacoes_com_pesos = [(combinacao, sum(pos[1] for pos in combinacao)) for combinacao in todas_combinacoes]

    # Ordena as combinações pelo peso total
    combinacoes_ordenadas_por_peso = sorted(combinacoes_com_pesos, key=lambda x: x[1])

    # Retorna as k melhores combinações com base no peso total
    
    return adaptar_output_para_formato_desejado(combinacoes_ordenadas_por_peso[:k])




