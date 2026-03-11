import React from 'react';
import style from './home.module.css';
import { Container } from '../../components/container';
import supabase from '../../services/supabaseClient';
import { Link } from 'react-router';

interface VeiculosProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: VeiculoImageProps[];
}

interface VeiculoImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {
  const [input, setInput] = React.useState('');
  const [veiculos, setVeiculos] = React.useState<VeiculosProps[]>([]);
  const [loadImages, setLoadImages] = React.useState<string[]>([]);

  async function handleSearchVeiculos() {
    if (input === '') {
      loadVeiculo();
      return;
    }

    setVeiculos([]);
    setLoadImages([]);

    const { data, error } = await supabase
      .from('carros')
      .select('*')
      .ilike('name', `%${input}%`);

    if (error) {
      alert('veiculo não encontrado');
      return;
    }
    setVeiculos(data);
  }

  React.useEffect(() => {
    loadVeiculo();
  }, []);

  async function loadVeiculo() {
    const { data, error } = await supabase
      .from('carros')
      .select('*')
      .order('price', { ascending: false });

    if (error) {
      console.error('Erro ao buscar veiculos');
    }

    setVeiculos(data || []);
  }

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  return (
    <>
      <div className={style.hero}>
        <h1 className={style.title}>
          Encontre o veículo dos seus <span>sonhos</span>
        </h1>
        <p className={style.subtitle}>
          Milhares de ofertas de seminovos e novos com garantia em todo o Brasil
        </p>
        <section className={style.search}>
          <input
            className={style.searchInput}
            type="text"
            placeholder="Buscar veículo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={style.searchButton} onClick={handleSearchVeiculos}>
            Buscar
          </button>
        </section>
      </div>

      <Container>
        <main className={style.Veiculolist}>
          {veiculos.map((veiculo) => (
            <Link key={veiculo.id} to={`veiculo/${veiculo.id}`}>
              <article className={style.Veiculocard}>
                <div
                  className={style.imageSkeleton}
                  style={{
                    display: loadImages.includes(veiculo.id) ? 'none' : 'block',
                  }}
                ></div>
                <img
                  className={style.veiculoImage}
                  src={veiculo.images?.[0]?.url}
                  alt={veiculo.name}
                  onLoad={() => handleImageLoad(veiculo.id)}
                  style={{
                    display: loadImages.includes(veiculo.id) ? 'block' : 'none',
                  }}
                />
                <div className={style.infoVeiculo}>
                  <p className={style.nameVeiculo}>{veiculo.name}</p>
                  <span className={style.veiculoMeta}>
                    {veiculo.year} - {veiculo.km} km
                  </span>
                </div>
                <div className={style.priceBox}>
                  <p className={style.priceLabel}>Preço à vista</p>
                  <strong className={style.priceValue}>
                    {Number(veiculo.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </strong>
                  <span className={style.cityVeiculo}>{veiculo.city}</span>
                </div>
              </article>
            </Link>
          ))}
        </main>
      </Container>
    </>
  );
}
