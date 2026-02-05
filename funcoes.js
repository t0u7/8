function login() {
    var url = location.search;
    $('#loginMsg').html("<p class='alert alert-info'>Carregando...</p>");
    $.post('login', { 'login_ajax': 1, 'usuario': $('#usuario').val(), 'senha': $('#senha').val(), 'entrar': 'Entrar', 'url': url, 'captcha_code': $('#campo_captcha').val() }, function (data) {
        if (data.resposta == 1) {
            $('#usuario').val('');
            $('#senha').val('');
            location = data.url;
            $('#loginMsg').html("<p class='alert alert-success'>Login efetuado com sucesso!</p>");
        } else if (data.resposta == 0) {
            $('#loginMsg').html("<p class='alert alert-danger'>Erro ao efetuar login!</p>");
        } else if (data.resposta == 2) {
            $('#loginMsg').html("<p class='alert alert-danger'>Usu&aacute;rio ou senha inv&aacute;lido!</p>");
        } else if (data.resposta == 3) {
            $('#loginMsg').html("<p class='alert alert-danger'>Preencha o campo de usu&aacute;rio e o de senha!</p>");
        } else if (data.resposta == 4) {
            $('#loginMsg').html("<p class='alert alert-danger'>Usu&aacute;rio bloqueado!</p>");
        } else if (data.resposta == 5) {
            $('#loginMsg').html("<p class='alert alert-danger'>Usu&aacute;rio cancelado!</p>");
        } else if (data.resposta == 6) {
            $('#loginMsg').html("<p class='alert alert-danger'>Usu&aacute;rio desligado da empresa!</p>");
        } else if (data.resposta == 7) {
            $('#loginMsg').html("<p class='alert alert-danger'>Errou mais de 3 vezes a senha! Reinicie o navegador para tentar novamente!</p>");
        } else if (data.resposta == 8) {
            $('#loginMsg').html("<p class='alert alert-danger'>Usu&aacute;rio ou senha inv&aacute;lido! Digite o Código abaixo para tentar novamente!!</p>");
            $('#loginCap').html(data.retorno);
            if (data.esqueci_senha != null) {
                $("#lembrar_senha").modal();
            }
        } else if (data.resposta == 9) {
            $('#loginMsg').html("<p class='alert alert-danger'>CAPTCHA inv&aacute;lido! Digite o Código correto para tentar novamente</p>");
            $('#loginCap').html(data.retorno);
            //            if (data.url != null) {
            //                location = data.url;
            //            }
        } else if (data.resposta == 10) {
            $('#loginMsg').html("<p class='alert alert-danger'>Cadastro Inativo! Digite o Código abaixo para tentar novamente!</p>");
            $('#loginCap').html(data.retorno);
        }
    }, 'json');
}

function lembrarSenha(url) {
    url = url + 'lembrarsenha/lembrarsenha';
    console.log(url);
    $.post(url, { lembrar_senha: 1, email: $('#email').val(), cpf: $('#cpf').val(), cnpj: $('#cnpj').val() }, function (data) {
        if (data.resposta == 1) {
            $('#mensagem').attr('class', data.class);
            $('#mensagem').html(data.msg);
            $('#conteudo_modal').remove();
            $('#footer_modal').remove();
        } else {
            $('#mensagem').attr('class', data.class);
            $('#mensagem').html(data.msg);
        }

    }, 'json');
}

function sessao(minutos, segundos, url) {
    if (minutos > 0 || segundos > 0) {
        $('#sessao_expira').html('Sua sessão expira em: ' + minutos + ':' + (segundos < 10 ? '0' + segundos : segundos));
        segundos--;
        if (segundos < 0) {
            segundos = 59;
            minutos--;
        }

        if (segundos == 0) {
            $.post(url, { expira: 1 }, function (data) {
                minutos = data.minutos;
                segundos = data.segundos;
            }, 'json');
        }
        setTimeout(function () {
            sessao(minutos, segundos, url);
        }, 1000);
    } else {
        $('#sessao_expira').html('Sua sess&atilde;o expirou!');
    }

}

function opcoes(idDestino, url) {
    var destino = $('#' + idDestino);
    $.get(url, null, function (data) {
        destino.html(data);
    }, 'html');
}

function mostraCamposHw(idDestino, url, id) {
    var destino = $('#' + idDestino);
    $.get(url, null, function (data) {
        if (id == 1365) {
            destino.html(data);
        } else {
            destino.html('');
        }
    }, 'html');
}

function alteraSituacaoVPN(url, dados, mensagem, destino) {
    if (mensagem !== null) {
        if (confirm(mensagem)) {
            $.post(url, dados, function (data) {
                $(data).insertAfter(destino);
                destino.remove();
            }, 'html');
        }
    } else {
        $.post(url, dados, function (data) {
            $(data).insertAfter(destino);
            destino.remove();
        }, 'html');
    }

}

function historicoVPN(url, id, destino) {
    $.post(url, id, function (data) {
        destino.html(data);
    }, 'html');
}

function mensagemBloqueioTerminal(dados) {
    var url = location.href;
    var id = dados['id_vpn'];
    $.post(url, dados, function (data) {
        if (data.resposta == 1) {
            $('#btn_mensagem_bloqueio_' + id).html('Remover Mensagem Bloqueio');
            alert('Mensagem de bloqueio ativada com sucesso!');
        } else {
            if (data.resposta == 2) {
                $('#btn_mensagem_bloqueio_' + id).html('Mensagem Bloqueio');
                alert('Mensagem de bloqueio removida com sucesso!');
            } else {
                alert('Erro inesperado!');
            }
        }
    }, 'json');
}

function atualizarPoliticas(url, dados) {
    $.post(url, dados, function (data) {
        if ($(data).filter('option').size() == 1) {
            $('#botao_adicionar_politica').fadeOut();
        } else {
            $('#botao_adicionar_politica').fadeIn();
        }
        $('#politica_comercial').html(data);
    }, 'html');
}

function atualizaSubPlanos(url, dados) {
    $.post(url, dados, function (data) {
        $('#sub_plano_modal').html(data);
    }, 'html');
}

function atualizaHistorico(url, dados) {
    $.post(url, dados, function (data) {
        $('#tabela_historico').html(data);
    }, 'html');
}

function removerPolitica(url, dados) {
    if (confirm('Deseja realmente retirar este sub-plano do parceiro?\nIsso ira impedi-lo de cadastrar novos clientes com este sub-plano.')) {
        var id = dados['id_politica'];
        var urlRemover = url + 'revendas/editar/' + dados['id_parceiro'];
        var urlAtualizaPolitica = url + 'ajax-revendas/atualizar-politica/' + dados['id_parceiro'];
        var urlHistorico = url + 'ajax-revendas/atualizar-historico/' + dados['id_parceiro'];
        $.post(urlRemover, dados, function (data) {
            if (data.resposta == 1) {
                $('#politica_' + id).remove();
                atualizarPoliticas(urlAtualizaPolitica, dados);
                atualizaHistorico(urlHistorico, dados);
            } else {
                alert('Erro ao remover politica!');
            }
        }, 'json');
    }
}

function ajaxSalvaClientes(url, dados, callback) {
    var urlSalvaJson = url + 'ajax-revendas/salvajson/' + dados['id_parceiro']
    $.post(urlSalvaJson, dados, function (data) {
        callback(data)
    }, 'html')
}

function ajaxClientes(url, dados) {
    var urlJsonCliente = url + 'ajax-revendas/jsoncliente/' + dados['id_parceiro']
    $.post(urlJsonCliente, dados, function (data) {
        if (dados['select'] == 1) {
            $('#cliRevenda1').html(data)
        } else {
            $('#cliRevenda2').html(data)
        }
    }, 'html')
}

function atribuirPolitica(url, dados) {
    var urlAtribuir = url + 'revendas/editar/' + dados['id_parceiro'];
    var urlTabela = url + 'ajax-revendas/atribuir-politica/' + dados['id_politica'];
    var urlAtualizaPolitica = url + 'ajax-revendas/atualizar-politica/' + dados['id_parceiro'];
    var urlHistorico = url + 'ajax-revendas/atualizar-historico/' + dados['id_parceiro'];
    $.post(urlAtribuir, dados, function (data) {
        if (data.resposta == 1) {
            adicionarDadoTabela(urlTabela, dados);
            atualizarPoliticas(urlAtualizaPolitica, dados);
            atualizaHistorico(urlHistorico, dados);
        }
    }, 'json');
}

function adicionarDadoTabela(url, dados) {
    $.post(url, dados, function (data) {
        $('#lista_politica').add().html($('#lista_politica').html() + data);
    }, 'html');
}

var dependentes = new Array();
var tarefas = new Array();

function dependenciaPermissao(obj, marcar) {
    var valor = obj.val();
    var nome = obj.attr('name');
    if (valor == 0) {
        $('input[name*="' + nome + '"]').each(function () {
            if ($(this).val() != 0)
                $(this).removeAttr('checked');
        });
    } else {
        $('input[name*="' + nome + '"]').each(function () {
            if ($(this).val() == 0)
                $(this).removeAttr('checked');
        });
        var chk = $('div#permissoes input');
        if (marcar) {
            if (dependentes[valor] != undefined) {
                for (var i = 0; i < dependentes[valor].length; i++) {
                    chk.each(function () {
                        var $this = $(this);
                        if ($this.val() == dependentes[valor][i]) {
                            $this.prop('checked', 'checked');
                        }
                    });
                }
            }
        } else {
            for (var i in dependentes) {
                for (var j = 0; j < dependentes[i].length; j++) {
                    if (dependentes[i][j] == valor) {
                        chk.each(function () {
                            var $this = $(this);
                            if ($this.val() == i) {
                                $this.removeAttr('checked');
                                $this.trigger('change');
                            }
                        });
                    }
                }
            }
        }
    }
}

function carregaRegrasCheckbox() {
    $.post(location.href, 'dependentes=1', function (data) {
        for (var i in data.dependentes) {
            dependentes[i] = data.dependentes[i];
        }
        tarefas = data.tarefas;
    }, 'json');
}

function carregarGraficoAtividades(url, filtro) {
    $.post(url, { carrega_grafico_atividades: 1, filtro: filtro }, function (data) {
        var strData = data.datas[0];
        var dataInicial = strData.split("-");
        var periodo;
        if (filtro == 'dia') {
            periodo = [parseInt(dataInicial[0]), parseInt(dataInicial[1]), parseInt(dataInicial[2])];
        }

        var series = new Array();
        for (var i = 0; i < data.series.length; i++) {
            var valores = new Array();
            for (var j = 0; j < data.valores[i].length; j++) {
                valores[j] = parseInt(data.valores[i][j]);
            }
            series[i] =
                {
                    data: valores,
                    name: data.series[i],
                    pointInterval: filtro == 'dia' ? 24 * 3600 * 1000 : null,
                    pointStart: filtro == 'dia' ? Date.UTC(periodo[0], periodo[1], periodo[2]) : null,
                    color: 'rgba(' + data.cores[i] + ',0.5)'
                }
                ;
        }

        var options = {
            chart: {
                animation: {
                    duration: 1000,
                    easing: 'linear'
                },
                renderTo: 'graficoAtividades',
                zoomType: 'x'
            },
            title: {
                text: 'Atividades por ' + filtro
            },
            subtitle: {
                text: 'Clique e arraste para especificar o período que deseja obter mais detalhes'
            },
            xAxis: {
                categories: filtro == 'mes' ? data.datas : null,
                minRange: filtro == 'dia' ? 10 * 24 * 3600000 : null,
                type: 'datetime',
                labels: {
                    align: 'right',
                    rotation: -45
                }
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            plotOptions: {
                series: {
                    animation: {
                        duration: 2000,
                        easing: 'linear'
                    }
                },
                line: {
                    animation: {
                        duration: 2000,
                        easing: 'linear'
                    }
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                },
            },
            series: series
        };
        Highcharts.setOptions({
            lang: {
                contextButtonTitle: 'Opções de exportação',
                printChart: 'Imprimir Gráfico',
                downloadPNG: 'Download da imagem em PNG ',
                downloadJPEG: 'Download da imagem em JPEG',
                downloadPDF: 'Download da imagem em PDF',
                downloadSVG: 'Download da imagem em SVG',
                resetZoom: 'Tirar Zoom',
                resetZoomTitle: 'Voltar o zoom ao primeiro nível',
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Dezembro'],
                shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
            }
        });
        new Highcharts.Chart(options);
    }, 'json');
}

function carregarGraficoContas(url) {
    $.post(url, { carrega_grafico_contas: 1 }, function (data) {

        var series = new Array();
        for (var i = 0; i < data.valores.length; i++) {
            var dadosSeries = new Array();
            for (var j = 0; j < data.valores[i].length; j++) {
                dadosSeries[j] = {
                    name: data.series[i],
                    y: parseInt(data.valores[i][j])
                };
            }
            series[i] = {
                name: data.series[i],
                data: dadosSeries,
                color: 'rgba(' + data.cores[i] + ',0.5)',
                borderWidth: 1,
                borderColor: 'rgba(' + data.cores[i] + ',1)'
            };
        }
        var options = {
            chart: {
                renderTo: 'graficoProdutoSituacao',
                type: 'column'
            },
            title: {
                text: 'Contas por produto e situação'
            },
            xAxis: {
                categories: data.datas,
                type: 'category',
                labels: {
                    align: 'right',
                    rotation: -45
                }
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                },
            },
            series: series
        };
        Highcharts.setOptions({
            lang: {
                drillUpText: 'Voltar ao nível anterior',
                contextButtonTitle: 'Opções de exportação',
                printChart: 'Imprimir Gráfico',
                downloadPNG: 'Download da imagem em PNG ',
                downloadJPEG: 'Download da imagem em JPEG',
                downloadPDF: 'Download da imagem em PDF',
                downloadSVG: 'Download da imagem em SVG',
                resetZoom: 'Tirar Zoom',
                resetZoomTitle: 'Voltar o zoom ao primeiro nível',
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Dezembro'],
                shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
            }
        });
        new Highcharts.Chart(options);
    }, 'json');
}

function visualizaSenha(vfilter) {
    if (vfilter) {
        alert('VFILTER, entrar em contato com o 0800-644-4833 ');
        return;
    }

    function timerSenha(segundos) {
        if (segundos == 0) {
            $('#redefinirSenhaOK').html('Redefinir');
            $('#redefinirSenhaOK').removeAttr("disabled");
        } else {
            $('#redefinirSenhaOK').html(segundos);
            segundos--;
            setTimeout(function () {
                timerSenha(segundos);
            }, 1000);

        }
    }
    $("#redefinirSenhaOK").show();
    $('#redefinirSenhaOK').prop("disabled", "disabled");
    $('#modal_redefinir_senha').modal();
    timerSenha(10);
}

function redefinirSenha(idVpn) {
    var url = location.href;
    $("#redefinirSenhaOK").hide();
    $.post(url, { visualizaSenha: 1, id: idVpn }, function (data) {
        if (data.resposta == 1) {
            $("#conteudo_senha").text('Nova Senha VPN: ' + data.senha);
        } else {
            $("#conteudo_senha").text('Não foi possivel realizar a solicitação. \nContate o setor de Desenvolvimento.');
        }
    }, 'json');
}

function trataInscricaoEstadual(checked) {
    if (checked == true) {
        $('#insc_estadual').prop('required', false);
        $('#insc_estadual').prop('disabled', true);
    } else {
        $('#insc_estadual').prop('required', true);
        $('#insc_estadual').prop('disabled', false);
    }
}

function incluirHTML(url, dados, mensagem, destino) {
    if (!mensagem || confirm(mensagem)) {
        $.post(url, dados, function (data) {
            var result = $(data);
            result.insertAfter(destino);
            destino.remove();
            setTimeout(function () {
                $('.alert-fade', result.parent()).fadeOut('slow', function () {
                    $(this).remove();
                });
            }, 5000);

        }, 'html');
    }
}

// funcoes auxiliares da funcao validaCepWebservice()
function limparFormularioCep(sufixo) {
    // Limpa valores do formulário de cep
    $('#cep' + sufixo).val("");
    $("#logradouro" + sufixo).val("");
    $("#complemento" + sufixo).val("");
    $("#numero" + sufixo).val("")
    $("#bairro" + sufixo).val("");
    $("#uf" + sufixo).val("");
    $("#cidade" + sufixo).val("");
}

function removerAcentos(str) {
    // mapa dos caracters especiais
    var map = {
        "â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A",
        "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E",
        "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I",
        "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O",
        "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U",
        "ç": "c", "Ç": "C"
    };

    // trocando os caracteres
    return str.replace(/[\W\[\] ]/g, function (c) {
        return map[c] || c
    });
}

function validaFormatoCep(cep) {
    // Expressão regular para validar o cep
    var validacep = /^[0-9]{8}$/;

    // Valida o formato do cep
    return validacep.test(cep);
}

// Quando o campo cep perde o foco
function validaCepWebservice(valor, sufixo = '') {
    // Nova variável "cep" somente com dígitos
    var valorCep = valor.replace(/\D/g, '');

    var cep = $('#cep' + sufixo);
    var logradouro = $('#logradouro' + sufixo);
    var complemento = $('#complemento' + sufixo);
    var numero = $('#numero' + sufixo);
    var bairro = $('#bairro' + sufixo);
    var uf = $('#uf' + sufixo);
    var cidade = $('#cidade' + sufixo);

    var antigoLogradouro = logradouro.val();
    var antigoComplemento = complemento.val();
    var antigoNumero = numero.val();
    var antigoBairro = bairro.val();
    // var antigoUf = uf.val();
    // var antigoCidade = cidade.val();

    // Verifica se o cep esta vazio
    if (valorCep != "") {
        // testa o formato do cep
        if (validaFormatoCep(valorCep)) {
            // Preenche os campos com "..."
            logradouro.val("...");
            complemento.val("...");
            numero.val("...");
            bairro.val("...");
            uf.val("...");
            cidade.val("...");

            // Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/" + valorCep + "/json/?callback=?", function (dados) {
                // testa erro (se tiver erro nao encontrou o cep) nao da para usar fail() jquery muito antigo
                if (!("erro" in dados)) {
                    if (antigoLogradouro == "" && antigoBairro == "") {
                        logradouro.val(dados.logradouro);
                        complemento.val(dados.complemento);
                        numero.val(dados.unidade);
                        bairro.val(dados.bairro);
                    } else {
                        if (dados.logradouro != "") {
                            logradouro.val(dados.logradouro);
                        } else {
                            logradouro.val(antigoLogradouro);
                        }

                        if (dados.complemento != "") {
                            complemento.val(dados.complemento);
                        } else {
                            complemento.val(antigoComplemento);
                        }

                        if (dados.unidade != "") {
                            numero.val(dados.unidade);
                        } else {
                            numero.val(antigoNumero);
                        }

                        if (dados.bairro != "") {
                            bairro.val(dados.bairro);
                        } else {
                            bairro.val(antigoBairro);
                        }
                    }

                    // Selecionando o estado
                    $("#uf" + sufixo + " option").filter(function () {
                        return $(this).text() == dados.uf;
                    }).prop("selected", true);

                    // Acionando o onchange
                    uf.trigger("change");

                    // Selecionando a cidade precisa de um delay para carregar as cidades
                    setTimeout(function () {
                        $("#cidade" + sufixo + " option").filter(function () {
                            return $(this).text() == removerAcentos(dados.localidade);
                        }).prop("selected", true);
                    }, 1000);
                } else {
                    cep.val("");
                    logradouro.val(antigoLogradouro);
                    complemento.val(antigoComplemento);
                    numero.val(antigoNumero);
                    bairro.val(antigoBairro);

                    alert("CEP não encontrado.");
                }
            });
        } else {
            // cep invalido
            cep.val("");
            logradouro.val(antigoLogradouro);
            complemento.val(antigoComplemento);
            numero.val(antigoNumero);
            bairro.val(antigoBairro);

            alert("Formato de CEP inválido.");
        }
    } else {
        // cep sem valor
        logradouro.val(antigoLogradouro);
        complemento.val(antigoComplemento);
        numero.val(antigoNumero);
        bairro.val(antigoBairro);

        alert("CEP não pode ser vazio.");
    }
}
