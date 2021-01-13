<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Buyers
 *
 * @ORM\Table(name="buyers", indexes={@ORM\Index(name="IDX_49E2BD628BAC62AF", columns={"city_id"})})
 * @ORM\Entity(repositoryClass="App\Repository\BuyersRepository")
 */
class Buyers
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
     * @ORM\Column(name="name", type="text", length=65535, nullable=true)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="type", type="text", length=65535, nullable=true)
     */
    private $type;

    /**
     * @var \Cities
     *
     * @ORM\ManyToOne(targetEntity="Cities")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="city_id", referencedColumnName="id")
     * })
     */
    private $city;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCity(): ?Cities
    {
        return $this->city;
    }

    public function setCity(?Cities $city): self
    {
        $this->city = $city;

        return $this;
    }


}
