<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Cities
 *
 * @ORM\Table(name="cities")
 * @ORM\Entity(repositoryClass="App\Repository\CitiesRepository")
 */
class Cities
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="zipcode", type="string", length=50, nullable=true)
     */
    private $zipcode;

    /**
     * @var string|null
     *
     * @ORM\Column(name="city", type="text", length=65535, nullable=true)
     */
    private $city;

    /**
     * @var float|null
     *
     * @ORM\Column(name="lat", type="float", precision=10, scale=0, nullable=true)
     */
    private $lat;

    /**
     * @var float|null
     *
     * @ORM\Column(name="long", type="float", precision=10, scale=0, nullable=true)
     */
    private $long;

    /**
     * @var string|null
     *
     * @ORM\Column(name="insee_code", type="string", length=50, nullable=true)
     */
    private $inseeCode;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(?float $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLong(): ?float
    {
        return $this->long;
    }

    public function setLong(?float $long): self
    {
        $this->long = $long;

        return $this;
    }

    public function getInseeCode(): ?string
    {
        return $this->inseeCode;
    }

    public function setInseeCode(?string $inseeCode): self
    {
        $this->inseeCode = $inseeCode;

        return $this;
    }


}
