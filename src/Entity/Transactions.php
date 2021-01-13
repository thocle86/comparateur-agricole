<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Transactions
 *
 * @ORM\Table(name="transactions", indexes={@ORM\Index(name="IDX_EAA81A4C13481D2B", columns={"farmer_id"}), @ORM\Index(name="IDX_EAA81A4C4584665A", columns={"product_id"}), @ORM\Index(name="IDX_EAA81A4C6C755722", columns={"buyer_id"})})
 * @ORM\Entity(repositoryClass="App\Repository\TransactionsRepository")
 */
class Transactions
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
     * @ORM\Column(name="created_at", type="text", length=65535, nullable=true)
     */
    private $createdAt;

    /**
     * @var int|null
     *
     * @ORM\Column(name="price", type="integer", nullable=true)
     */
    private $price;

    /**
     * @var float|null
     *
     * @ORM\Column(name="quantity", type="float", precision=10, scale=0, nullable=true)
     */
    private $quantity;

    /**
     * @var \Farmers
     *
     * @ORM\ManyToOne(targetEntity="Farmers")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="farmer_id", referencedColumnName="id")
     * })
     */
    private $farmer;

    /**
     * @var \Products
     *
     * @ORM\ManyToOne(targetEntity="Products")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="product_id", referencedColumnName="id")
     * })
     */
    private $product;

    /**
     * @var \Buyers
     *
     * @ORM\ManyToOne(targetEntity="Buyers")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="buyer_id", referencedColumnName="id")
     * })
     */
    private $buyer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?string
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?string $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(?int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(?float $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getFarmer(): ?Farmers
    {
        return $this->farmer;
    }

    public function setFarmer(?Farmers $farmer): self
    {
        $this->farmer = $farmer;

        return $this;
    }

    public function getProduct(): ?Products
    {
        return $this->product;
    }

    public function setProduct(?Products $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getBuyer(): ?Buyers
    {
        return $this->buyer;
    }

    public function setBuyer(?Buyers $buyer): self
    {
        $this->buyer = $buyer;

        return $this;
    }


}
