export let currentFile = $state({});

export function changeFile(content: object) {
    currentFile = content;
}

export async function changeContent(fileName: string) {
    if(window.location.pathname === "/demo") {
        currentFile = (JSON.parse(localStorage.getItem("demo_project")!).commands || []).find((v: { name: string }) => v.name === fileName).content;
    }
}