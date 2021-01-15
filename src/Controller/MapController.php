<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\FarmersRepository;
use App\Repository\BuyersRepository;

class MapController extends AbstractController
{
    /**
     * @Route("/", name="map")
     * @return Response
     */
    public function index(FarmersRepository $farmersRepo, BuyersRepository $buyersRepo): Response
    {
        /*$farmers = $farmersRepo->findAll();
        $coord = [];

        for ($i = 0; $i < 20; $i++) {
            $coord[] = [$farmers[$i]->getCity()->getCity(), $farmers[$i]->getCity()->getLat(), $farmers[$i]->getCity()->getLong()];
        }*/

        $results = $farmersRepo->findNbFarmersPerCity();
        /*$departement = $departement[1] . '000';*/

        for ($i = 0; $i < count($results); $i++) {
            if (strlen($results[$i]['zipcode']) != 5) {
                $results[$i]['zipcode'] = 0 . $results[$i]['zipcode'];
            }

            $results[$i]['zipcode'] = $results[$i]['zipcode'][0].$results[$i]['zipcode'][1];
        }

        $departments = [];

        for ($i = 0; $i < count($results); $i++) {
            if (key_exists($results[$i]['zipcode'], $departments)) {
                $departments[$results[$i]['zipcode']] += $results[$i]['nbFarmers'];
            } else {
                $departments[$results[$i]['zipcode']] = $results[$i]['nbFarmers'];
            }
        }

        $buyers = $buyersRepo->findAll();
        $nameBuyers = [];
        foreach ($buyers as $value) {
            $nameBuyers = $value->GetName();
        }
        
        return $this->render("test.html.twig", [
            'departments' => $departments,
            ]);
    }
}
