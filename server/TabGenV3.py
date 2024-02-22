# Importações necessárias
from itertools import product
import heapq

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

    # Proximidade das Notas (nos trastes) porem não conta quando o trasde é 0
    distancia_maxima_trastes = 0
    for i in range(1, len(trastes)):
        if trastes[i] != 0 and trastes[i-1] != 0:
            distancia_maxima_trastes += abs(trastes[i] - trastes[i-1])
    peso += distancia_maxima_trastes * 10  # Penalidade por maior distância entre trastes

    """ # Proximidade nas Cordas
    cordas.sort()
    for i in range(1, len(cordas)):
        peso += (cordas[i] - cordas[i-1] - 1) * 5  # Penalidade por maior distância entre cordas adjacentes """

    # Facilidade de Formação e Distribuição Balanceada
    # Ajuste baseado na distribuição das notas e padrões comuns de acordes
    peso += abs(3 - (trastes[-1] - trastes[0])) * 5  # Incentiva acordes dentro de uma extensão de 4 trastes

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
            acorde = acorde_com_peso  # Ignora o peso individual do acorde aqui
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


def dijkstra(graph, start, end):
    # Implementação simplificada do Dijkstra para encontrar o caminho mais curto
    queue, seen = [(0, start, [])], set()
    while queue:
        (cost, v, path) = heapq.heappop(queue)
        if v not in seen:
            path = path + [v]
            seen.add(v)
            if v == end:
                return cost, path
            for next_node, weight in graph[v].items():
                if next_node not in seen:
                    heapq.heappush(queue, (cost + weight, next_node, path))
    return float("inf"), []


def dijkstra_with_exclusions(graph, start, end, excluded_edges):
    # Inicializa a fila de prioridade e o conjunto de nós visitados
    queue, seen = [(0, start, [])], set()
    while queue:
        (cost, v, path) = heapq.heappop(queue)
        if v not in seen:
            path = path + [v]  # Adiciona o nó atual ao caminho
            seen.add(v)
            if v == end:
                return cost, path  # Retorna o custo e o caminho se o destino for alcançado
            for next_node, weight in graph[v].items():
                # Verifica se a aresta atual está na lista de exclusões
                if (v, next_node) not in excluded_edges and next_node not in seen:
                    heapq.heappush(queue, (cost + weight, next_node, path))
    return float("inf"), []  # Retorna infinito e lista vazia se não houver caminho

def map_combinations_to_graph(combinations, notes):
    graph = {}
    # Itera sobre cada sequência de combinações e suas notas correspondentes
    for seq_index, (seq, note_seq) in enumerate(zip(combinations, notes)):
        note_label = '_'.join(note_seq)  # Cria um rótulo baseado nas notas
        # Itera sobre cada combinação dentro da sequência
        for combo_index, (combo, weight) in enumerate(seq):
            # Gera um identificador único para o nó atual usando o rótulo da nota
            #para cada nota adicionar a string e o fret
            fret_str_id =  '|'.join([f"f{posicao['fret']}.s{posicao['string']}" for posicao in combo])
            node_id = f"{note_label}__{fret_str_id}__{seq_index}"
            if node_id not in graph:
                graph[node_id] = {}
            
            # Prepara para mapear as arestas para o próximo conjunto de combinações e notas
            if seq_index + 1 < len(combinations):
                for next_combo_index, (next_combo, next_weight) in enumerate(combinations[seq_index + 1]):
                    next_note_label = '_'.join(notes[seq_index + 1])
                    next_fret_str_id =  '|'.join([f"f{posicao['fret']}.s{posicao['string']}" for posicao in next_combo])
                    
                    next_node_id = f"{next_note_label}__{next_fret_str_id}__{seq_index+1}"
                    weight_diff = abs(weight - next_weight)
                    # Adiciona a aresta e o peso no grafo
                    graph[node_id][next_node_id] = weight_diff
    
    return graph

def get_start_end_nodes(graph):
    # first note from graph with final index = start_index
    ss = list(graph.keys())[0].split("__")
    ee = list(graph.keys())[-1].split("__")
    start_notes = ss[0]
    end_notes = ee[0]
    start_index = int(ss[-1])
    end_index = int(ee[-1])

    #get the start based on the note and index
    start = []
    for key in graph:
        ss = key.split("__")
        if ss[0] == start_notes and int(ss[-1]) == start_index:
            start.append(key)
    #get the end based on the note and index
    end = []
    for key in graph:
        ss = key.split("__")
        if ss[0] == end_notes and int(ss[-1]) == end_index:
            end.append(key)
    
    
    return start, end
    

# Função auxiliar para decodificar um ponto do caminho
def decode_path_node(node):
    parts = node.split('__')
    notes = parts[0].split('_')
    frets_strs = parts[1].split('|')
    
    converts = []
    
    for i,fret_str in enumerate(frets_strs):
        fret_string = fret_str.split('.')
        fret = fret_string[0].split('f')[1]
        string = int(fret_string[1].split('s')[1]) - 1
        convert =  {'note': notes[i], 'pos': {'string': string, 'fret': fret}}
        converts.append(convert)
        
    return converts

# Função para transformar o input no formato desejado
def transform_input(input_data):
    output = []
    for _,paths in input_data.items():
        weight, path = paths
        decoded_path = [decode_path_node(node) for node in path]
        output.append({'weight': weight, 'path': decoded_path}) 
    output = sorted(output, key=lambda x: x['weight'])
    return output
    
    

def gen_paths(sequencia_acordes, k, parametros):
    combinacoes_limitadas_por_acorde = []
    sequencia_acordes_new = []
    
    for acorde in sequencia_acordes:
        posicoes_acorde_com_peso = encontrar_posicoes_acorde_com_peso(acorde, parametros)
        if len(posicoes_acorde_com_peso) == 0:
            print(f"Não foi possível encontrar posições para o acorde {acorde}")
        else:
            combinacoes_limitadas_por_acorde.append(posicoes_acorde_com_peso)
            sequencia_acordes_new.append(acorde)

    graph = map_combinations_to_graph(combinacoes_limitadas_por_acorde,sequencia_acordes_new)

    start_nodes,end_nodes = get_start_end_nodes(graph)
    
    all_results = {}

    removed_edges = []
    
    for _ in range(k):
        for start_node in start_nodes:
            for end_node in end_nodes:
                # Ignora a chamada se o nó de início for igual ao nó de fim
                if start_node == end_node:
                    continue
                result_key = f"{start_node} to {end_node}"
                dijsk = dijkstra_with_exclusions(graph, start_node, end_node, removed_edges)
                if len(dijsk[1]) == 0:
                    continue
                all_results[result_key] =  dijsk
                for i in range(len(all_results[result_key][1])-1):
                    removed_edges.append((all_results[result_key][1][i],all_results[result_key][1][i+1]))
            
    
    transformed_output = transform_input(all_results)
        
    return transformed_output