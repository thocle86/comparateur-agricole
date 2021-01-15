<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\FarmersRepository;

class MapController extends AbstractController
{
    /**
     * @Route("/", name="map")
     * @return Response
     */
    public function index(FarmersRepository $farmersRepo): Response
    {
        $results = $farmersRepo->findNbFarmersPerCity();

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
        
        return $this->render("index.html.twig", ['departments' => $departments]);
    }

    /**
     * @Route("/farmers", name="farmers")
     */
    public function getFarmers(FarmersRepository $farmersRepo): Response
    {
        $farmers = $farmersRepo->findAllGroupByCity();
        $coord = [];

        for ($i = 0; $i < count($farmers); $i++) {
            
        }

        return $this->json($coord, 200);
    }
}
