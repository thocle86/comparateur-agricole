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
        $farmers = $farmersRepo->findAll();
        $coord = [];

        for ($i = 0; $i < 20; $i++) {
            $coord[] = [$farmers[$i]->getCity()->getCity(), $farmers[$i]->getCity()->getLat(), $farmers[$i]->getCity()->getLong()];
        }

        return $this->render("index.html.twig", ['coord' => $coord]);
    }
}
