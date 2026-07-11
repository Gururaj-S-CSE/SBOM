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