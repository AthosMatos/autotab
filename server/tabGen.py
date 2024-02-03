import heapq
from utils.notes import genNotes
import json

notes, str_notes = genNotes()  # TUNNING=["E2", "A2", "D3", "G3", "B3", "E4"]

""" for nt in str_notes:
    print(nt) """


def has_next_note_in_seq(indexOfNote, group_note_in_seq, note_in_list_comp):
    return (
        indexOfNote < len(group_note_in_seq)
        and note_in_list_comp == group_note_in_seq[indexOfNote]
    )


def node_name(note, string, fret, indexOfNote, indexOfEvent):
    return (
        note
        + "_"
        + str(string)
        + "_"
        + str(fret)
        + "_"
        + str(indexOfNote)
        + "_"
        + str(indexOfEvent)
    )


def connect_notes(
    graph,
    note_seq,
    chord_string_i,
    event_index,
    group_note_seq,
    indexOfNote_f,
    options,
):
    for string_i, string_list in enumerate(str_notes):
        for fret_j, note_in_list in enumerate(string_list):
            if note_in_list != note_seq:
                continue

            nn_name = node_name(
                note_in_list, string_i, fret_j, chord_string_i, event_index
            )

            if graph.get(nn_name) is None:
                graph[nn_name] = {}

            if len(group_note_seq) < 2:
                continue

            for string_i2, string_list_comp in enumerate(str_notes):
                for fret_k, note_in_list_comp in enumerate(string_list_comp):
                    if string_i == string_i2:
                        continue
                    indexOfNote = has_next_note_in_seq(
                        indexOfNote_f,
                        group_note_seq,
                        note_in_list_comp,
                    )
                    if indexOfNote == False:
                        continue

                    n_name = node_name(
                        note_in_list_comp,
                        string_i2,
                        fret_k,
                        indexOfNote_f,
                        event_index,
                    )

                    distance = calculate_playability_distance(
                        fret_j, fret_k, string_i, string_i2, options, True
                    )
                    graph[nn_name][n_name] = distance

    return graph


def has_next_event_in_seq(indexOfEvent, notesInSequence):
    return indexOfEvent < len(notesInSequence)


def connect_chords(
    graph,
    ref_note,
    notesInSequence,
    event_index,
    str_notes,
    indexOfEvent,
    group_note_seq,
    indexOfNote,
    n_name_final_index,
    options,
):
    for string_i, string_list in enumerate(str_notes):
        for fret_j, note_in_list in enumerate(string_list):
            if note_in_list != ref_note:
                continue
            nn_name = node_name(
                note_in_list,
                string_i,
                fret_j,
                group_note_seq,
                event_index,
            )
            """ if graph.get(nn_name) is None:
                graph[nn_name] = {} """

            for string_i2, string_list_comp in enumerate(str_notes):
                for fret_k, note_in_list_comp in enumerate(string_list_comp):
                    if note_in_list_comp != notesInSequence[indexOfEvent][indexOfNote]:
                        continue
                    n_name = node_name(
                        note_in_list_comp,
                        string_i2,
                        fret_k,
                        n_name_final_index,
                        indexOfEvent,
                    )

                    distance = calculate_playability_distance(
                        fret_j, fret_k, string_i, string_i2, options
                    )
                    graph[nn_name][n_name] = distance


def gen_clean_graph(
    notesInSequence: list,
    print_graph=False,
    options={"fret_confort": 5, "slide_tolerance": 0},
):
    graph = {}

    for event_index, group_note_seq in enumerate(notesInSequence):
        indexOfEvent_f = event_index + 1
        ref_note_f = group_note_seq[-1]

        for chord_string_i, note_seq in enumerate(group_note_seq):
            indexOfNote_f = chord_string_i + 1

            graph = connect_notes(
                graph,
                note_seq,
                chord_string_i,
                event_index,
                group_note_seq,
                indexOfNote_f,
                options,
            )

        if has_next_event_in_seq(indexOfEvent_f, notesInSequence):
            connect_chords(
                graph,
                ref_note_f,
                notesInSequence,
                event_index,
                str_notes,
                indexOfEvent_f,
                len(group_note_seq) - 1,
                0,
                0,
                options,
            )

    if print_graph:
        for node, connections in graph.items():
            print(node, connections)

    return graph


def calculate_playability_distance(
    fret_j, fret_k, string_i, string_i2, options: dict, isChord=False
):
    fret_distance = abs(fret_k - fret_j)
    string_distance = abs(string_i2 - string_i)
    
    """ if (fret_k - fret_j) < 0:
        fret_distance += abs(fret_k - fret_j) """
        
    if fret_k == 0:
            fret_distance = 0
   
    
    confort_fret = 0
    slide_tolerance = 0

    if options["fret_confort"]:
        confort_fret = abs(options["fret_confort"] - fret_k)       

    if options["slide_tolerance"] and not isChord:
        slide_tolerance = options["slide_tolerance"]

    fret_distance = (fret_distance + confort_fret) - slide_tolerance
    playability_distance = fret_distance + string_distance + 1  

    return playability_distance


def getNames(note, graph, seqlen, start=True):
    # sample
    names = []
    for node in graph:
        node_split = node.split("_")
        if node_split[0] == note:
            if not start and int(node_split[-1]) == (seqlen - 1):
                names.append(node)
            elif start and int(node_split[-1]) == 0:
                names.append(node)

    return names


def dijkstra(graph, start, end):
    # Initialize distances with infinity for all nodes except the start node
    distances = {node: float("inf") for node in graph}
    distances[start] = 0

    # Priority queue to store (distance, node) pairs
    priority_queue = [(0, start)]

    # Dictionary to store the path followed to reach each node
    paths = {node: [] for node in graph}

    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)

        # Check if the current path to the current node is shorter than the recorded distance
        if current_distance > distances[current_node]:
            continue

        # Explore neighbors of the current node
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            # If a shorter path is found, update the distance and add to the priority queue
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))
                # Update the path for the neighbor
                paths[neighbor] = paths[current_node] + [current_node]

    return distances, paths


def block_edges(graph, path):
    # Mark the edges in the path as blocked by setting their weight to infinity
    for i in range(len(path) - 1):
        node1, node2 = path[i], path[i + 1]
        # delete edge
        if node2 in graph[node1]:
            del graph[node1][node2]


def custom_k_shortest(graph, seq, k):
    k_notes_postitions = []
    for _ in range(k):
        start_nodes = getNames(seq[0][0], graph, len(seq))
        end_nodes = getNames(seq[-1][-1], graph, len(seq), False)

        """ print("start_nodes: ", start_nodes)
        print("end_nodes: ", end_nodes)
        print() """
        paths = []

        for start_node in start_nodes:
            for end_node in end_nodes:
                shortest_distances, shortest_paths = dijkstra(
                    graph, start_node, end_node
                )
                # print("shortest_distances: ", shortest_distances)
                for node, distance in shortest_distances.items():
                    """print(
                        f"Shortest path from {start_node} to {node}: {shortest_paths[node] + [node]}, Distance: {distance}"
                    )"""
                    if node == end_node:
                        short_path = shortest_paths[node] + [node]
                        paths.append((distance, short_path))

        # sort paths by distance

        # paths.sort(key=lambda x: x[0])
        # paths = paths[:cut_limit]

        # print("paths: ", paths)

        cut_trigger = []
        i = -1
        for group in seq:
            for note in group:
                i += 1
            cut_trigger.append(i)

        # cut_notes_postitions = []
        for path in paths:
            notes_postitions = []
            chord = []
            for i, note_data in enumerate(path[1]):
                note_data_split = note_data.split("_")
                note = note_data_split[0]
                string = note_data_split[1]
                fret = note_data_split[2]
                event = {
                    "note": note,
                    "pos": {"string": string, "fret": fret},
                }

                # check if i is in cut_trigger
                if i in cut_trigger:
                    # print("i: ", i)
                    chord.append(event)
                    notes_postitions.append(chord)
                    chord = []
                else:
                    chord.append(event)

            # print("notes_postitions: ", notes_postitions)
            block_edges(graph, path[1])
            if len(notes_postitions) == len(seq):
                k_notes_postitions.append({"weight": path[0], "path": notes_postitions})

        """ if len(cut_notes_postitions):
            k_notes_postitions.append(cut_notes_postitions) """
    k_notes_postitions = sorted(k_notes_postitions, key=lambda x: x["weight"])
    return k_notes_postitions


def gen_paths(
    seq, k, options={"fret_confort": 5, "slide_tolerance": 0}
):  # options={"fret_confort": 0, "slide_tolerance": 2}
    for c in seq:
        for n in c:
            if n not in notes:
                print("note not in notes: ", n)
                return

    graph = gen_clean_graph(seq, print_graph=False, options=options)

    k_notes_postitions = custom_k_shortest(graph, seq, k)

    return k_notes_postitions
