import json
import os
import networkx as nx
import networkx as nx


def build_dependency_graph(dependencies):
    graph = nx.DiGraph()

    for dependency in dependencies:
        parent = dependency["component"]

        graph.add_node(parent)

        for child in dependency["depends_on"]:
            graph.add_node(child)
            graph.add_edge(parent, child)

    return graph


def graph_to_json(graph):
    nodes = []
    edges = []

    for node in graph.nodes():
        nodes.append({
            "id": node,
            "label": node
        })

    for source, target in graph.edges():
        edges.append({
            "source": source,
            "target": target
        })

    return {
        "nodes": nodes,
        "edges": edges
    }
TRANSITIVE_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "sample_data",
    "transitive_dependencies.json"
)


def load_transitive_dependencies(graph):

    with open(TRANSITIVE_PATH) as f:
        transitive = json.load(f)

    # Libraries already present in uploaded SBOM
    existing_nodes = set(graph.nodes())

    for item in transitive:

        parent = item["parent_library"]
        child = item["child_library"]

        # Only extend the graph if the parent already exists
        if parent not in existing_nodes:
            continue

        graph.add_node(child)
        graph.add_edge(parent, child)

    return graph

def find_attack_paths(graph, vulnerable_components):

    attack_paths = []

    for vulnerable in vulnerable_components:

        target = vulnerable["component"]

        if not vulnerable["has_vulnerabilities"]:
            continue

        for node in graph.nodes():

            if node == target:
                continue

            try:

                path = nx.shortest_path(
                    graph,
                    source=node,
                    target=target
                )

                attack_paths.append({

                    "source": node,

                    "target": target,

                    "path": path

                })

            except nx.NetworkXNoPath:

                pass

    return attack_paths