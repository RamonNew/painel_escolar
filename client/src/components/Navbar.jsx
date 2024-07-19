import React from 'react'

function Navbar() {
    return (
        <div class="menu">

            <nav class="navbar navbar-expand-md navbar-light bg-info">

                <a href="" class="navbar-brand ms-5">Painel</a>

                <div class="collapse navbar-collapse justify-content-center px-2" id="menu">

                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="" class="nav-link">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">Sobre nós</a>
                        </li>

                        <li class="nav-item dropdown">
                            <a href="" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Interno</a>

                            <ul class="dropdown-menu">
                                <li>
                                    <a href="" class="dropdown-item">Trabalhe Conosco</a>
                                </li>
                                <li>
                                    <a href="" class="dropdown-item">Blog</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">Contato</a>
                        </li>
                    </ul>
                </div>
                <button class="navbar-toggler mx-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#menu" aria-controls="menu"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    )
}

export default Navbar