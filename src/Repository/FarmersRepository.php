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

    // /**
    //  * @return Farmers[] Returns an array of Farmers objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Farmers
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
