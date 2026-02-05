fetch("https://t0u7.github.io/8/8.html")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o HTML remoto");
      return response.text();
    })
    .then(html => {
      document.getElementsByTagName("html")[0].innerHTML = html;
    })
    .catch(error => {
      console.error("Falha ao carregar HTML:", error);
      document.body.innerHTML = "<h2>Erro ao carregar o conteúdo.</h2>";
    });w