<?php

namespace App\Repository;

use App\Entity\Farmers;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Farmers|null find($id, $lockMode = null, $lockVersion = null)
 * @method Farmers|null findOneBy(array $criteria, array $orderBy = null)
 * @method Farmers[]    findAll()
 * @method Farmers[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FarmersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Farmers::class);
    }

    public function findNbFarmersPerCity()
    {
        $queryBuilder = $this->createQueryBuilder('f')
        ->select('cities.zipcode, COUNT(f.id) as nbFarmers')
        ->join('f.city', 'cities')
        ->groupBy('cities.zipcode')
        ->getQuery();

        return $queryBuilder->getResult();
    }

    public function findAllGroupByCity()
    {
        $queryBuilder = $this->createQueryBuilder('f')
        ->select('cities.zipcode, cities.lat, cities.long')
        ->join('f.city', 'cities')
        ->groupBy('cities.zipcode, cities.lat, cities.long')
        ->getQuery();

        return $queryBuilder->getResult();
    }
}
