import React from 'react';
import { PanelLayout } from '../../components/panelLayout';
import style from './dashboard.module.css';
import supabase from '../../services/supabaseClient';
import { AuthContext } from '../../contexts/AuthContext';
import { Container } from '../../components/container';
import { Link } from 'react-router';
import iconeMais from '../../assets/icone+.png';
import iconeLixeira from '../../assets/iconeLixeira.png';

interface CarsProps {
  id: string;
  name: string;
  year: string;
  km: string;
  city: string;
  images: ImageCarProps[];
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}

export function Dashboard() {
  const [cars, setCars] = React.useState<CarsProps[]>([]);

  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    async function loadCars() {
      if (!user?.uid) {
        return;
      }
      const { data, error } = await supabase
        .from('carros')
        .select('*')
        .eq('user_id', user.uid);

      if (error) {
        console.error('Erro ao buscar veículos: ', error);
        return;
      }
      setCars(data || []);
    }

    loadCars();
  }, []);

  async function handleDeleteCar(car: CarsProps) {
    const imagePaths = car.images.map((image) => {
      return `images/${image.uid}/${image.name}`;
    });

    const { error: storageError } = await supabase.storage
      .from('car')
      .remove(imagePaths);

    if (storageError) {
      console.error('Erro ao deletar imagens:', storageError);
      return;
    }

    const { error } = await supabase.from('carros').delete().eq('id', car.id);
    console.log(error);

    if (error) {
      console.error('Erro ao deletar carro: ', error);
      return;
    }

    setCars((prev) => prev.filter((item) => item.id !== car.id));
  }

  return (
    <PanelLayout>
      <Container>
        <article>
          <div className={style.whapper}>
            <div>
              <h2 className={style.title}> Painel de veículos</h2>
              <p className={style.subTitle}>
                Gerencie e monitore sua frota registrada.
              </p>
            </div>
            <div>
              <Link className={style.button} to="/dashboard/new">
                <img src={iconeMais} alt="Adicionar veículo" />
                Novo Veículo
              </Link>
            </div>
          </div>
        </article>

        <main className={style.carContainer}>
          {cars.map((car) => (
            <section className={style.carCads} key={car.id}>
              <button
                className={style.buttonDelete}
                onClick={() => handleDeleteCar(car)}
              >
                <img src={iconeLixeira} alt="botão para excluir veículos" />
              </button>
              <img
                className={style.carImage}
                src={car.images?.[0]?.url}
                alt={car.name}
              />
              <div className={style.carDetail}>
                <h2>
                  {car.name} {car.year}
                </h2>
                <div className={style.carInfo}>
                  <span>{car.km} km</span>
                  <p>{car.city}</p>
                </div>
              </div>
            </section>
          ))}
        </main>
      </Container>
    </PanelLayout>
  );
}
